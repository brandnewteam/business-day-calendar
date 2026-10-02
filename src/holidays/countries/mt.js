import { defineHoliday, isFixedDate, isEasterOffset } from "../utils.js";

/** @typedef {import("luxon").DateTime} DateTime */

/**
 * A predicate that returns true when the given date is a holiday.
 * @callback HolidayMatcher
 * @param {DateTime} date
 * @returns {boolean}
 */

/*
 * Maltese public holidays: the five national holidays and the nine public holidays
 * of the National Holidays and Other Public Holidays Act (Cap. 252).
 */

/**
 * Checks if the date is New Year's Day (January 1)
 */
export const isNewYearsDay = defineHoliday(
  "L-Ewwel tas-Sena",
  isFixedDate(1, 1)
);

/**
 * Checks if the date is the Feast of St. Paul's Shipwreck (February 10)
 */
export const isStPaulsShipwreck = defineHoliday(
  "Nawfraġju ta' San Pawl",
  isFixedDate(2, 10)
);

/**
 * Checks if the date is the Feast of St. Joseph (March 19)
 */
export const isStJosephsDay = defineHoliday("San Ġużepp", isFixedDate(3, 19));

/**
 * Checks if the date is Freedom Day (March 31)
 */
export const isFreedomDay = defineHoliday("Jum il-Ħelsien", isFixedDate(3, 31));

/**
 * Checks if the date is Good Friday (Friday before Easter Sunday)
 */
export const isGoodFriday = defineHoliday(
  "Il-Ġimgħa l-Kbira",
  isEasterOffset(-2)
);

/**
 * Checks if the date is Workers' Day (May 1)
 */
export const isWorkersDay = defineHoliday("Jum il-Ħaddiem", isFixedDate(5, 1));

/**
 * Checks if the date is Sette Giugno (June 7)
 */
export const isSetteGiugno = defineHoliday("Sette Giugno", isFixedDate(6, 7));

/**
 * Checks if the date is the Feast of St. Peter and St. Paul (June 29)
 */
export const isStPeterAndStPaul = defineHoliday(
  "L-Imnarja",
  isFixedDate(6, 29)
);

/**
 * Checks if the date is the Feast of the Assumption (August 15)
 */
export const isAssumptionDay = defineHoliday(
  "Santa Marija",
  isFixedDate(8, 15)
);

/**
 * Checks if the date is Victory Day / Feast of Our Lady of Victories (September 8)
 */
export const isVictoryDay = defineHoliday("Jum il-Vitorja", isFixedDate(9, 8));

/**
 * Checks if the date is Independence Day (September 21)
 */
export const isIndependenceDay = defineHoliday(
  "Jum l-Indipendenza",
  isFixedDate(9, 21)
);

/**
 * Checks if the date is the Feast of the Immaculate Conception (December 8)
 */
export const isImmaculateConception = defineHoliday(
  "Il-Kunċizzjoni",
  isFixedDate(12, 8)
);

/**
 * Checks if the date is Republic Day (December 13)
 */
export const isRepublicDay = defineHoliday(
  "Jum ir-Repubblika",
  isFixedDate(12, 13)
);

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday("Il-Milied", isFixedDate(12, 25));

/**
 * Returns all Maltese public holiday matchers
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isStPaulsShipwreck,
  isStJosephsDay,
  isFreedomDay,
  isGoodFriday,
  isWorkersDay,
  isSetteGiugno,
  isStPeterAndStPaul,
  isAssumptionDay,
  isVictoryDay,
  isIndependenceDay,
  isImmaculateConception,
  isRepublicDay,
  isChristmasDay,
];
