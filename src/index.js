import { DateTime } from "luxon";

class BusinessCalendar {
  /** @type {DateTime} */
  _bcDate;

  /** @type {number[]} */
  _bcBusinessDays;

  /** @type {import("index").HolidayMatcher[]} */
  _bcHolidayMatchers = [];

  /**
   * @param {DateTime} [date]
   * @param {import("index").BusinessCalendarOptions} options
   * @returns
   */
  constructor(date, options = {}) {
    if (typeof date === "undefined") {
      this._bcDate = DateTime.now();
    } else {
      this._bcDate = DateTime.fromJSDate(date.toJSDate());
    }

    this._bcBusinessDays = options.businessDays || [1, 2, 3, 4, 5];
    this._bcHolidayMatchers = options.holidayMatchers || [];

    return new Proxy(this, {
      get(target, prop) {
        if (prop in target) {
          return target[prop];
        }

        const value = target._bcDate[prop];

        if (typeof value === "function") {
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
 * @param {DateTime} date
 * @param {import("index").BusinessCalendarOptions} options
 * @returns {BusinessCalendar}
 */
const createBusinessCalendar = (date, options) => {
  return new BusinessCalendar(date, options);
};

export default createBusinessCalendar;
