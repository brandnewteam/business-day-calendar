import { DateTime } from "luxon";

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
   * @returns
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
}

/**
 *
 * @param {DateTime} date
 * @param {CreateOptions} options
 * @returns
 */
const createBusinessCalendar = (date, options) => {
  return new BusinessCalendar(date, options);
};

export default createBusinessCalendar;
