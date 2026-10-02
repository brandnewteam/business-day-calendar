import { DateTime } from "luxon";

// Re-export all utility functions
export * from "./utils.js";

// Import all holiday functions for easy access to groups
import { defineHoliday } from "./utils.js";
import { getHolidays as getUS } from "./countries/us.js";
import { getHolidays as getIT } from "./countries/it.js";
import { getHolidays as getSM } from "./countries/sm.js";

/**
 * A predicate that returns true when the given date is a holiday.
 * @callback HolidayMatcher
 * @param {DateTime} date
 * @returns {boolean}
 */

/** @typedef {import("./utils.js").NamedHolidayMatcher} NamedHolidayMatcher */

/**
 * A holiday occurrence within a given year.
 * @typedef {Object} HolidayEntry
 * @property {string} name - The holiday name (see `defineHoliday`); falls back to the matcher function's name
 * @property {number} month - Month (1-12)
 * @property {number} day - Day of the month
 */

/**
 * Lists every day of the given year matched by at least one of the holiday matchers,
 * sorted by date. A matcher that recognizes more than one day in a year (e.g. a
 * holiday observed twice) yields one entry per day. Identical entries coming from
 * different matchers (e.g. when combining countries that share a holiday) are reported once.
 *
 * @param {HolidayMatcher[]} holidayMatchers - Holiday matchers, e.g. `holidays.IT.all`
 * @param {number} year - The year to list holidays for
 * @returns {HolidayEntry[]}
 */
export function listHolidays(holidayMatchers, year) {
  /** @type {HolidayEntry[]} */
  const entries = [];
  const seen = new Set();

  for (
    let date = DateTime.utc(year, 1, 1);
    date.year === year;
    date = date.plus({ days: 1 })
  ) {
    for (const matcher of holidayMatchers) {
      if (!matcher(date)) continue;

      const name =
        /** @type {NamedHolidayMatcher} */ (matcher).holidayName ??
        matcher.name;
      const key = `${name}|${date.month}|${date.day}`;
      if (seen.has(key)) continue;

      seen.add(key);
      entries.push({ name, month: date.month, day: date.day });
    }
  }

  return entries;
}

/**
 * Returns a combined array of holiday matchers from multiple countries or regions
 *
 * @param {HolidayMatcher[]} matcherSets - Arrays of holiday matcher functions
 * @returns {HolidayMatcher[]} Combined array of unique holiday matchers
 */
export function combineHolidays(...matcherSets) {
  // Flatten all matcher sets and ensure uniqueness
  return [...new Set(matcherSets.flat())];
}

// Export holiday groups
export const holidays = {
  US: {
    federal: getUS(true),
    all: getUS(),
  },
  IT: {
    all: getIT(),
  },
  SM: {
    all: getSM(),
  },
};

/**
 * Creates a holiday matcher for weekend-adjusted holidays
 * If the holiday falls on a weekend, it returns the closest weekday
 * (Friday for Saturday holidays, Monday for Sunday holidays)
 *
 * @param {HolidayMatcher} holidayMatcher - The original holiday matcher function
 * @returns {HolidayMatcher} - A new matcher that handles weekend adjustments
 */
export function adjustWeekendHolidayMatchers(holidayMatcher) {
  const { holidayName } = /** @type {NamedHolidayMatcher} */ (holidayMatcher);
  /** @type {HolidayMatcher} */
  const adjusted = (date) => {
    // Check if the date itself is the holiday
    if (holidayMatcher(date)) {
      return true;
    }

    // If this is a Friday, check if Saturday is the holiday
    if (date.weekday === 5) {
      const nextDay = date.plus({ days: 1 });
      if (holidayMatcher(nextDay)) {
        return true;
      }
    }

    // If this is a Monday, check if Sunday is the holiday
    if (date.weekday === 1) {
      const prevDay = date.minus({ days: 1 });
      if (holidayMatcher(prevDay)) {
        return true;
      }
    }

    return false;
  };

  // Preserve the original name so the observed day is reported by `listHolidays`
  return holidayName ? defineHoliday(holidayName, adjusted) : adjusted;
}

/**
 * Create weekend-adjusted holiday matchers
 *
 * @param {HolidayMatcher[]} holidayMatchers - The original holiday matcher function
 * @returns {HolidayMatcher[]} - A new matcher that handles weekend adjustments
 */
export function getWeekendAdjustedHolidays(holidayMatchers) {
  return holidayMatchers.map(adjustWeekendHolidayMatchers);
}
