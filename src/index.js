import { DateTime, Duration } from "luxon";

// Export holiday matchers
export * from "./holidays/index.js";

/**
 * A predicate that returns true when the given date is a holiday.
 * @callback HolidayMatcher
 * @param {DateTime} date
 * @returns {boolean}
 */

/** @typedef {import("luxon").DurationLikeObject} DurationLikeObject */
/** @typedef {import("luxon").WeekdayNumbers} WeekdayNumbers */

/**
 * @typedef {Object} CreationOptions
 * @property {HolidayMatcher[]} [holidayMatchers] - A list of functions that mark a date as a holiday.
 * @property {WeekdayNumbers[]} [weekendDays] - Override locale weekend settings. ISO weekday numbers (Mon=1 .. Sun=7). Unless specified, the current locale's settings are used.
 */

/**
 * Create a Business Calendar function (a BusinessDateTime factory) with a defined set of business days and holidays.
 * These options are defined at the creation of this calendar object, and passed on when BusinessDateTime methods return new instances.
 *
 * @param {CreationOptions} [options]
 * @returns {(date?: DateTime | Date) => BusinessDateTime & DateTime}
 */
export const createBusinessCalendar = (options) => {
  // @ts-ignore BusinessDateTime is a Proxy object for DateTime, hence {BusinessDateTime & DateTime}
  return (date) => {
    return new BusinessDateTime(date, options);
  };
};

export class BusinessDateTime {
  /** @type {DateTime} */
  _DT;

  /** @type {WeekdayNumbers[] | undefined} */
  _bcWeekendOverride;

  /** @type {HolidayMatcher[]} */
  _bcHolidayMatchers;

  /**
   *
   * @param {DateTime | Date} [date] Defaults to DateTime.now()
   * @param {CreationOptions} [options]
   */
  constructor(date, options) {
    if (typeof date === "undefined") {
      this._DT = DateTime.now();
    } else if (date instanceof Date) {
      this._DT = DateTime.fromJSDate(date);
    } else {
      this._DT = DateTime.fromMillis(date.toMillis(), {
        zone: date.zone,
        locale: date.locale || undefined,
        outputCalendar: date.outputCalendar || undefined,
        numberingSystem: date.numberingSystem || undefined,
      });
    }

    const opts = options || {};

    this._bcHolidayMatchers = opts.holidayMatchers || [];

    // This option is generally passed by the createBusinessCalendar function, not when recreating the object
    if (opts.weekendDays) {
      const days = Array.from(new Set(opts.weekendDays));
      if (days.length > 6 || Math.min(...days) < 1 || Math.max(...days) > 7) {
        throw new Error("Invalid weekendDays option");
      }
      this._bcWeekendOverride = days;
    }

    return new Proxy(this, {
      get(target, prop) {
        if (Object.prototype.hasOwnProperty.call(target, prop)) {
          // @ts-ignore The runtime check above assures that the property exists in BusinessDateTime's prototype.
          return target[prop];
        }

        // @ts-ignore The given property is a method that we want to call on DateTime
        if (["toString", "toLocaleString", "valueOf"].includes(prop)) {
          // @ts-ignore We know these methods are present in DateTime's prototype.
          const dateMethod = target._DT[prop];
          if (typeof dateMethod === "function") {
            // @ts-ignore We pass args as-is.
            return (...args) => dateMethod.apply(target._DT, args);
          }
        }

        if (prop in target) {
          // @ts-ignore The property/method exists in BusinessDateTime's prototype's chain.
          return target[prop];
        }

        // @ts-ignore Get the property from DateTime
        const value = target._DT[prop];

        if (typeof value === "function") {
          // @ts-ignore the property is a method that exists in DateTime's prototype, we pass arguments as-is.
          return (...args) => {
            const result = value.apply(target._DT, args);
            if (result instanceof DateTime) {
              return new BusinessDateTime(result, {
                weekendDays: target._bcWeekendOverride,
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
    if (this._bcWeekendOverride) {
      if (
        this._bcWeekendOverride.includes(
          // @ts-ignore _bcWeekendOverride is a type of WeekdayNumbers[], which is a subset of number[].
          this._DT.weekday
        )
      ) {
        return false;
      }
    } else if (this._DT.isWeekend) {
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

    const otherIsLater = otherDateTime.valueOf() > this._DT.valueOf();

    /** @type {BusinessDateTime & DateTime} */
    // @ts-ignore
    let start = this.startOf("day");

    /** @type {BusinessDateTime & DateTime} */
    // @ts-ignore
    const end = otherDateTime.startOf("day");

    if (start.hasSame(end, "day")) {
      return Duration.fromObject({ days: 0 });
    }

    let businessDays = 0;

    // Forwards in time
    if (otherIsLater) {
      if (start.isBusinessDay() && opts.excludeStartingDay) {
        start = start.plus({ days: 1 });
      }
      do {
        if (start.isBusinessDay()) {
          businessDays++;
        }
        start = start.plus({ days: 1 });
      } while (start._DT.valueOf() < end.valueOf());

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
      } while (start._DT.valueOf() > end.valueOf());
    }

    // If we ask for days already in the diff call, there could be floating point rounding issues when converting to days.
    const originalDiff = this._DT.diff(otherDateTime, "milliseconds");

    // We convert the difference to days as a floating point number.
    const everyDayFloat = originalDiff.as("days");

    // We get the difference of "complete" or "full" days between the two dates. Since the number
    // can be negative (depending on the direction of the diff), we need to either round up or down.
    // We then discard the sign to help with the calculation of non-business days.
    const anyDayInt = Math.abs(
      otherIsLater ? Math.floor(everyDayFloat) : Math.ceil(everyDayFloat)
    );

    // Once we have the total amount of days and the business days, we can calculate the non-business days
    // so we can add/subtract them from the original diff.
    const businessDaysInt = Math.abs(businessDays);
    const nonBusinessDaysInt = anyDayInt - businessDaysInt;

    let businessDiff;

    // When the diff method is called passing another DateTime as an argument which is later in time,
    // the resulting Duration should be negative, and vice versa. So we add when otherIsLater is true and
    // subtract when it's false.
    if (otherIsLater) {
      businessDiff = originalDiff.plus({ days: nonBusinessDaysInt });
    } else {
      businessDiff = originalDiff.minus({ days: nonBusinessDaysInt });
    }

    return businessDiff
      .shiftTo("days", "hours", "minutes", "seconds", "milliseconds")
      .normalize()
      .removeZeros();
  }

  /**
   * Add the specified amount of business time to the current DateTime. Example: adding 1 week will add 7 **working** days.
   * Fractional values are rounded up to the next integer.
   *
   * @param {Duration | DurationLikeObject} duration
   * @returns {BusinessDateTime & DateTime}
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
   * @returns {BusinessDateTime & DateTime}
   */
  minusBusiness(duration) {
    const dur = Duration.fromDurationLike(duration || {}).negate();

    return this.plusBusiness(dur);
  }

  /**
   * Returns a string representation of this DateTime appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    // @ts-ignore
    return this._DT[Symbol.for("nodejs.util.inspect.custom")]();
  }
}
