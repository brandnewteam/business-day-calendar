import { DateTime } from "luxon";

/**
 * A predicate that returns true when the given date is a holiday.
 * @callback HolidayMatcher
 * @param {DateTime} date
 * @returns {boolean}
 */

/**
 * A holiday matcher carrying a human-readable name, as produced by `defineHoliday`.
 * @typedef {HolidayMatcher & { holidayName?: string }} NamedHolidayMatcher
 */

/**
 * Attaches a human-readable name to a holiday matcher, so that it can be reported
 * by `listHolidays`. The original matcher is not mutated.
 *
 * @param {string} name - The holiday name, e.g. "Christmas Day"
 * @param {HolidayMatcher} matcher - The predicate that recognizes the holiday
 * @returns {NamedHolidayMatcher}
 */
export function defineHoliday(name, matcher) {
  /** @type {NamedHolidayMatcher} */
  const named = (date) => matcher(date);
  named.holidayName = name;
  return named;
}

/**
 * Calculates Easter Sunday for a given year using the Meeus/Jones/Butcher algorithm.
 * Returns an object with the month and day of Easter Sunday.
 *
 * @param {number} year - The year for which to calculate Easter Sunday
 * @returns {{ year: number, month: number, day: number }} - Object with year, month (1-12), and day
 */
export function calculateEaster(year) {
  // Algorithm from Astronomical Algorithms by Jean Meeus
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return { year, month, day };
}

/**
 * Calculates Easter Monday for a given year, which is the day after Easter Sunday.
 *
 * @param {number} year - The year for which to calculate Easter Monday
 * @returns {{ year: number, month: number, day: number }} - Object with year, month (1-12), and day
 */
export function calculateEasterMonday(year) {
  const easterSunday = calculateEaster(year);
  let day = easterSunday.day + 1;
  let month = easterSunday.month;

  // Handle month rollover if Easter is on the 31st
  if ((month === 3 && day > 31) || (month === 4 && day > 30)) {
    day = 1;
    month += 1;
  }

  return { year, month, day };
}

/**
 * Calculates Orthodox Easter Sunday for a given year (Julian computus, Meeus algorithm),
 * expressed as a date in the Gregorian calendar.
 *
 * @param {number} year - The year for which to calculate Orthodox Easter Sunday
 * @returns {{ year: number, month: number, day: number }} - Object with year, month (1-12), and day
 */
export function calculateOrthodoxEaster(year) {
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  // Easter in the Julian calendar
  const julianMonth = Math.floor((d + e + 114) / 31);
  const julianDay = ((d + e + 114) % 31) + 1;

  // Julian-to-Gregorian offset (13 days for 1900-2099)
  const offset = Math.floor(year / 100) - Math.floor(year / 400) - 2;
  const easter = DateTime.utc(year, julianMonth, julianDay).plus({
    days: offset,
  });

  return { year, month: easter.month, day: easter.day };
}

/**
 * Creates a matcher for a holiday that falls on the same calendar date every year.
 *
 * @param {number} month - Month (1-12)
 * @param {number} day - Day of the month
 * @returns {HolidayMatcher}
 */
export const isFixedDate = (month, day) => (date) =>
  date.month === month && date.day === day;

/**
 * Creates a matcher for a holiday defined as a number of days before or after Easter Sunday
 * (e.g. -2 for Good Friday, 1 for Easter Monday, 39 for Ascension Day, 50 for Whit Monday).
 *
 * @param {number} offset - Days relative to Easter Sunday (negative for days before)
 * @returns {HolidayMatcher}
 */
export const isEasterOffset = (offset) => (date) => {
  const easter = calculateEaster(date.year);
  const target = DateTime.utc(easter.year, easter.month, easter.day).plus({
    days: offset,
  });
  return date.month === target.month && date.day === target.day;
};

/**
 * Creates a matcher for a holiday defined as a number of days before or after Orthodox Easter Sunday.
 *
 * @param {number} offset - Days relative to Orthodox Easter Sunday (negative for days before)
 * @returns {HolidayMatcher}
 */
export const isOrthodoxEasterOffset = (offset) => (date) => {
  const easter = calculateOrthodoxEaster(date.year);
  const target = DateTime.utc(easter.year, easter.month, easter.day).plus({
    days: offset,
  });
  return date.month === target.month && date.day === target.day;
};

/**
 * Creates a matcher for the n-th given weekday of a month (e.g. the 3rd Monday of January).
 *
 * @param {number} month - Month (1-12)
 * @param {number} weekday - ISO weekday (1=Monday ... 7=Sunday)
 * @param {number} n - Occurrence within the month, starting from 1
 * @returns {HolidayMatcher}
 */
export const isNthWeekdayOfMonth = (month, weekday, n) => (date) =>
  date.month === month &&
  date.weekday === weekday &&
  Math.floor((date.day - 1) / 7) === n - 1;

/**
 * Creates a matcher for the last given weekday of a month (e.g. the last Monday of May).
 *
 * @param {number} month - Month (1-12)
 * @param {number} weekday - ISO weekday (1=Monday ... 7=Sunday)
 * @returns {HolidayMatcher}
 */
export const isLastWeekdayOfMonth = (month, weekday) => (date) =>
  date.month === month &&
  date.weekday === weekday &&
  date.plus({ days: 7 }).month !== month;
