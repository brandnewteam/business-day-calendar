import { DateTime, Duration } from "luxon";

/**
 * A predicate that returns true when the given date is a holiday.
 * @callback HolidayMatcher
 * @param {DateTime} date
 * @returns {boolean}
 */

/**
 * @typedef {Object} CreateOptions
 * @property {number[]} [businessDays] - ISO weekday numbers 1-7 (Mon=1 .. Sun=7). Defaults to [1,2,3,4,5].
 * @property {HolidayMatcher[]} [holidayMatchers] - A list of functions that mark a date as a holiday.
 */

/**
 *
 * @param {DateTime} date
 * @param {CreateOptions} options
 * @returns {BusinessCalendar}
 */
const createBusinessCalendar = (date, options) => {
  return new BusinessCalendar(date, options);
};

export class BusinessCalendar {
  _bcDate;

  /** @type {number[]} */
  _bcBusinessDays;

  /** @type {HolidayMatcher[]} */
  _bcHolidayMatchers = [];

  /**
   *
   * @param {DateTime} date
   * @param {CreateOptions} options
   */
  constructor(date, options) {
    if (typeof date === "undefined") {
      this._bcDate = DateTime.now();
    } else {
      this._bcDate = DateTime.fromJSDate(date.toJSDate());
    }

    const opts = options || {};

    this._bcBusinessDays = opts.businessDays || [1, 2, 3, 4, 5];
    this._bcHolidayMatchers = opts.holidayMatchers || [];

    return new Proxy(this, {
      get(target, prop) {
        if (prop in target) {
          // @ts-ignore
          return target[prop];
        }

        // @ts-ignore
        const value = target._bcDate[prop];

        if (typeof value === "function") {
          // @ts-ignore
          return (...args) => {
            const result = value.apply(target._bcDate, args);
            return result instanceof DateTime
              ? new BusinessCalendar(result, {
                  businessDays: target._bcBusinessDays,
                  holidayMatchers: target._bcHolidayMatchers,
                })
              : result;
          };
        }

        return value;
      },
    });
  }

  isBusinessDay() {
    const dayOfWeek = this._bcDate.weekday;

    if (!this._bcBusinessDays.includes(dayOfWeek)) {
      return false;
    }

    return !this.isHoliday();
  }

  isHoliday() {
    return this._bcHolidayMatchers.some((matcher) => matcher(this._bcDate));
  }

  /**
   * Counts the amount of business days between two DateTimes as a Duration.
   * @param {DateTime} otherDateTime - the DateTime to compare this one to
   * @param {Object} [options] - options for the comparison
   * @param {boolean} [options.excludeStartingDay=false] - when the starting day is a business day, exclude it from the count (ie. make the range excluding)
   * @returns {Duration} - the difference between the two DateTimes
   */
  diffBusinessDays(otherDateTime, options = {}) {
    if (!this._bcDate.isValid || !otherDateTime.isValid) {
      return Duration.invalid("created by diffing an invalid DateTime");
    }

    const opts = Object.assign(
      {
        excludeStartingDay: false,
      },
      options
    );

    const that = createBusinessCalendar(otherDateTime, {
      businessDays: this._bcBusinessDays,
      holidayMatchers: this._bcHolidayMatchers,
    });

    /** @type {BusinessCalendar & DateTime} */
    // @ts-ignore
    let start = this.startOf("day");

    /** @type {BusinessCalendar & DateTime} */
    // @ts-ignore
    const end = that.startOf("day");

    if (start.hasSame(end, "day")) {
      return Duration.fromObject({ days: 0 });
    }

    let businessDays = 0;

    // Forwards in time
    if (this._bcDate.valueOf() < that._bcDate.valueOf()) {
      if (start.isBusinessDay() && opts.excludeStartingDay) {
        start = start.plus({ days: 1 });
      }
      do {
        if (start.isBusinessDay()) {
          businessDays++;
        }
        start = start.plus({ days: 1 });
      } while (start._bcDate.valueOf() < end._bcDate.valueOf());

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
      } while (start._bcDate.valueOf() > end._bcDate.valueOf());
    }

    return Duration.fromObject({
      days: businessDays,
    });
  }
}

export default createBusinessCalendar;
