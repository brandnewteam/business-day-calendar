import { defineHoliday, isFixedDate, isEasterOffset } from "../utils.js";

/** @typedef {import("luxon").DateTime} DateTime */

/**
 * A predicate that returns true when the given date is a holiday.
 * @callback HolidayMatcher
 * @param {DateTime} date
 * @returns {boolean}
 */

/**
 * Checks if the date is New Year's Day (January 1)
 */
export const isNewYearsDay = defineHoliday("Nyårsdagen", isFixedDate(1, 1));

/**
 * Checks if the date is Epiphany (January 6)
 */
export const isEpiphany = defineHoliday("Trettondedag jul", isFixedDate(1, 6));

/**
 * Checks if the date is Good Friday (Friday before Easter Sunday)
 */
export const isGoodFriday = defineHoliday("Långfredagen", isEasterOffset(-2));

/**
 * Checks if the date is Easter Sunday
 */
export const isEasterSunday = defineHoliday("Påskdagen", isEasterOffset(0));

/**
 * Checks if the date is Easter Monday (day after Easter Sunday)
 */
export const isEasterMonday = defineHoliday("Annandag påsk", isEasterOffset(1));

/**
 * Checks if the date is May Day (May 1)
 */
export const isMayDay = defineHoliday("Första maj", isFixedDate(5, 1));

/**
 * Checks if the date is Ascension Day (39 days after Easter Sunday)
 */
export const isAscensionDay = defineHoliday(
  "Kristi himmelsfärdsdag",
  isEasterOffset(39)
);

/**
 * Checks if the date is Whit Sunday (49 days after Easter Sunday)
 */
export const isWhitSunday = defineHoliday("Pingstdagen", isEasterOffset(49));

/**
 * Checks if the date is Whit Monday (50 days after Easter Sunday).
 * Removed as a public holiday from 2005, when the National Day was introduced: only matches years before 2005.
 */
export const isWhitMonday = defineHoliday("Annandag pingst", (date) => {
  if (date.year >= 2005) return false;
  return isEasterOffset(50)(date);
});

/**
 * Checks if the date is the National Day of Sweden (June 6).
 * A public holiday since 2005: only matches years from 2005 onwards.
 */
export const isNationalDay = defineHoliday(
  "Sveriges nationaldag",
  (date) => date.year >= 2005 && date.month === 6 && date.day === 6
);

/**
 * Checks if the date is Midsummer Day (the Saturday between June 20 and June 26)
 */
export const isMidsummerDay = defineHoliday(
  "Midsommardagen",
  (date) =>
    date.weekday === 6 && date.month === 6 && date.day >= 20 && date.day <= 26
);

/**
 * Checks if the date is All Saints' Day (the Saturday between October 31 and November 6)
 */
export const isAllSaintsDay = defineHoliday(
  "Alla helgons dag",
  (date) =>
    date.weekday === 6 &&
    ((date.month === 10 && date.day === 31) ||
      (date.month === 11 && date.day <= 6))
);

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday("Juldagen", isFixedDate(12, 25));

/**
 * Checks if the date is the Second Day of Christmas (December 26)
 */
export const isSecondChristmasDay = defineHoliday(
  "Annandag jul",
  isFixedDate(12, 26)
);

/**
 * Returns all Swedish public holiday matchers (allmänna helgdagar, lag 1989:253).
 * Midsommarafton, Julafton and Nyårsafton are de facto days off but not statutory holidays and are left out.
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isEpiphany,
  isGoodFriday,
  isEasterSunday,
  isEasterMonday,
  isMayDay,
  isAscensionDay,
  isWhitSunday,
  isWhitMonday,
  isNationalDay,
  isMidsummerDay,
  isAllSaintsDay,
  isChristmasDay,
  isSecondChristmasDay,
];
