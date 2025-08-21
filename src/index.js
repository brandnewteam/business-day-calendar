import { DateTime, Duration } from "luxon";

/**
 * A predicate that returns true when the given date is a holiday.
 * @callback HolidayMatcher
 * @param {DateTime} date
 * @returns {boolean}
 */

/**
 * @typedef {Object} CreationOptions
 * @property {number[]} [weekendDays] - ISO weekday numbers 1-7 (Mon=1 .. Sun=7). Defaults to [6,7].
 * @property {HolidayMatcher[]} [holidayMatchers] - A list of functions that mark a date as a holiday.
 */

/** @typedef {import("luxon").DurationLikeObject} DurationLikeObject */

/**
 * Create a Business Calendar function (a BusinessDateTime factory) with a defined set of business days and holidays.
 * These options are defined at the creation of this calendar object, and passed on when BusinessDateTime methods return new instances.
 *
 * @param {CreationOptions} options
 * @returns {(date: DateTime) => BusinessDateTime}
 */
export const createBusinessCalendar = (options) => {
  return (date) => {
    return new BusinessDateTime(date, options);
  };
};

export class BusinessDateTime {
  _DT;

  /** @type {number[]} */
  _bcWeekendDays;

  /** @type {HolidayMatcher[]} */
  _bcHolidayMatchers = [];

  /**
   *
   * @param {DateTime} [date] Defaults to DateTime.now()
   * @param {CreationOptions} [options]
   */
  constructor(date, options) {
    if (typeof date === "undefined") {
      this._DT = DateTime.now();
    } else {
      this._DT = DateTime.fromMillis(date.toMillis(), {
        zone: date.zone,
        locale: date.locale || undefined,
        outputCalendar: date.outputCalendar || undefined,
        numberingSystem: date.numberingSystem || undefined,
      });
    }

    const opts = options || {};

    this._bcWeekendDays = Array.from(new Set(opts.weekendDays || [6, 7]));
    this._bcHolidayMatchers = opts.holidayMatchers || [];

    if (
      Math.max(...this._bcWeekendDays) > 7 ||
      Math.min(...this._bcWeekendDays) < 0
    ) {
      throw new Error("Invalid weekendDays option");
    }

    if (this._bcWeekendDays.length > 6) {
      throw new Error("Invalid weekendDays option");
    }

    return new Proxy(this, {
      get(target, prop) {
        // If the property exists on the target (not inherited), return it directly
        if (Object.prototype.hasOwnProperty.call(target, prop)) {
          // @ts-ignore
          return target[prop];
        }

        // If property is a method on Object.prototype that we want to override
        // @ts-ignore
        if (["toString", "toLocaleString", "valueOf"].includes(prop)) {
          // @ts-ignore
          const dateMethod = target._DT[prop];
          if (typeof dateMethod === "function") {
            // @ts-ignore
            return (...args) => dateMethod.apply(target._DT, args);
          }
        }

        if (prop in target) {
          // @ts-ignore
          return target[prop];
        }

        // @ts-ignore
        const value = target._DT[prop];

        if (typeof value === "function") {
          // @ts-ignore
          return (...args) => {
            const result = value.apply(target._DT, args);
            if (result instanceof DateTime) {
              return new BusinessDateTime(result, {
                weekendDays: target._bcWeekendDays,
                holidayMatchers: target._bcHolidayMatchers,
              });
            }
            return result;
          };
        }

        return value;
      },
    });
  }

  isBusinessDay() {
    const dayOfWeek = this._DT.weekday;

    if (this._bcWeekendDays.includes(dayOfWeek)) {
      return false;
    }

    return !this.isHoliday();
  }

  isHoliday() {
    return this._bcHolidayMatchers.some((matcher) => matcher(this._DT));
  }

  /**
   * Counts the amount of business days between two DateTimes as a Duration.
   * The starting day is included, unless the option to exclude it is set.
   * The end day is **not** included in the count.
   *
   * @param {DateTime} otherDateTime - the DateTime to compare this one to
   * @param {Object} [options] - options for the comparison
   * @param {boolean} [options.excludeStartingDay=false] - when the starting day is a business day, exclude it from the count (ie. make the range excluding)
   * @returns {Duration} - the difference between the two DateTimes
   */
  diffBusinessDays(otherDateTime, options = {}) {
    if (!this._DT.isValid || !otherDateTime.isValid) {
      return Duration.invalid("created by diffing an invalid DateTime");
    }

    const opts = Object.assign(
      {
        excludeStartingDay: false,
      },
      options
    );

    const that = new BusinessDateTime(otherDateTime, {
      weekendDays: this._bcWeekendDays,
      holidayMatchers: this._bcHolidayMatchers,
    });

    /** @type {BusinessDateTime & DateTime} */
    // @ts-ignore
    let start = this.startOf("day");

    /** @type {BusinessDateTime & DateTime} */
    // @ts-ignore
    const end = that.startOf("day");

    if (start.hasSame(end, "day")) {
      return Duration.fromObject({ days: 0 });
    }

    let businessDays = 0;

    // Forwards in time
    if (this._DT.valueOf() < that._DT.valueOf()) {
      if (start.isBusinessDay() && opts.excludeStartingDay) {
        start = start.plus({ days: 1 });
      }
      do {
        if (start.isBusinessDay()) {
          businessDays++;
        }
        start = start.plus({ days: 1 });
      } while (start._DT.valueOf() < end._DT.valueOf());

      // Backwards in time
    } else {
      if (start.isBusinessDay() && opts.excludeStartingDay) {
        start = start.minus({ days: 1 });
      }
      do {
        if (start.isBusinessDay()) {
          businessDays--;
        }
        start = start.minus({ days: 1 });
      } while (start._DT.valueOf() > end._DT.valueOf());
    }

    return Duration.fromObject({
      days: businessDays,
    });
  }

  /**
   * Add the specified amount of business time to the current DateTime. Example: adding 1 week will add 7 **working** days.
   * Fractional values are rounded up to the next integer.
   *
   * @param {Duration | DurationLikeObject} duration
   * @returns {BusinessDateTime}
   */
  plusBusiness(duration) {
    const dur = Duration.fromDurationLike(duration || {});

    const amount = dur.as("days") || 0;
    const direction = amount > 0 ? 1 : -1;

    let businessDays = Math.abs(Math.ceil(amount));

    /** @type {BusinessDateTime & DateTime} */
    // @ts-ignore
    let newDate = this;

    while (businessDays > 0) {
      newDate = newDate.plus({ days: direction });
      if (newDate.isBusinessDay()) {
        businessDays--;
      }
    }

    return newDate;
  }

  /**
   * Subtract the specified amount of business time to the current DateTime. Use positive amounts in the Duration.
   * See {@link BusinessDateTime.plusBusiness} for more information.
   *
   * @param {Duration | DurationLikeObject} duration
   * @returns {BusinessDateTime }
   */
  minusBusiness(duration) {
    const dur = Duration.fromDurationLike(duration).negate();

    return this.plusBusiness(dur);
  }
}
