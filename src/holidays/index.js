// Re-export all utility functions
export * from "./utils.js";

// Import all holiday functions for easy access to groups
import { getHolidays as getUS } from "./countries/us.js";
import { getHolidays as getIT } from "./countries/it.js";
import { getHolidays as getSM } from "./countries/sm.js";

/** @typedef {import("luxon").DateTime} DateTime */

/**
 * A predicate that returns true when the given date is a holiday.
 * @callback HolidayMatcher
 * @param {DateTime} date
 * @returns {boolean}
 */

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
  return (date) => {
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
