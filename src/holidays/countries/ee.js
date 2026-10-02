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
export const isNewYearsDay = defineHoliday("Uusaasta", isFixedDate(1, 1));

/**
 * Checks if the date is Independence Day, anniversary of the Republic of Estonia (February 24)
 */
export const isIndependenceDay = defineHoliday(
  "Iseseisvuspäev",
  isFixedDate(2, 24)
);

/**
 * Checks if the date is Good Friday (Friday before Easter Sunday)
 */
export const isGoodFriday = defineHoliday("Suur reede", isEasterOffset(-2));

/**
 * Checks if the date is Easter Sunday
 */
export const isEasterSunday = defineHoliday(
  "Ülestõusmispühade 1. püha",
  isEasterOffset(0)
);

/**
 * Checks if the date is Spring Day (May 1)
 */
export const isSpringDay = defineHoliday("Kevadpüha", isFixedDate(5, 1));

/**
 * Checks if the date is Whit Sunday (49 days after Easter Sunday)
 */
export const isWhitSunday = defineHoliday(
  "Nelipühade 1. püha",
  isEasterOffset(49)
);

/**
 * Checks if the date is Victory Day (June 23)
 */
export const isVictoryDay = defineHoliday("Võidupüha", isFixedDate(6, 23));

/**
 * Checks if the date is Midsummer Day / St. John's Day (June 24)
 */
export const isMidsummerDay = defineHoliday("Jaanipäev", isFixedDate(6, 24));

/**
 * Checks if the date is the Day of Restoration of Independence (August 20)
 */
export const isRestorationOfIndependenceDay = defineHoliday(
  "Taasiseseisvumispäev",
  isFixedDate(8, 20)
);

/**
 * Checks if the date is Christmas Eve (December 24).
 * A public holiday since 2005: only matches years from 2005 onwards.
 */
export const isChristmasEve = defineHoliday(
  "Jõululaupäev",
  (date) => date.year >= 2005 && date.month === 12 && date.day === 24
);

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday(
  "Esimene jõulupüha",
  isFixedDate(12, 25)
);

/**
 * Checks if the date is the Second Day of Christmas (December 26)
 */
export const isSecondChristmasDay = defineHoliday(
  "Teine jõulupüha",
  isFixedDate(12, 26)
);

/**
 * Returns all Estonian public holiday matchers (rahvuspüha and riigipühad, i.e. the
 * statutory days off). The riiklikud tähtpäevad (national/flag days) are working days and are left out.
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isIndependenceDay,
  isGoodFriday,
  isEasterSunday,
  isSpringDay,
  isWhitSunday,
  isVictoryDay,
  isMidsummerDay,
  isRestorationOfIndependenceDay,
  isChristmasEve,
  isChristmasDay,
  isSecondChristmasDay,
];
