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
export const isNewYearsDay = defineHoliday("Nouvel An", isFixedDate(1, 1));

/**
 * Checks if the date is Easter Monday (day after Easter Sunday)
 */
export const isEasterMonday = defineHoliday(
  "Lundi de Pâques",
  isEasterOffset(1)
);

/**
 * Checks if the date is Labour Day (May 1)
 */
export const isLabourDay = defineHoliday("Fête du Travail", isFixedDate(5, 1));

/**
 * Checks if the date is Europe Day (May 9), a legal holiday since 2019
 */
export const isEuropeDay = defineHoliday(
  "Journée de l'Europe",
  (date) => date.year >= 2019 && date.month === 5 && date.day === 9
);

/**
 * Checks if the date is Ascension Day (39 days after Easter Sunday)
 */
export const isAscensionDay = defineHoliday("Ascension", isEasterOffset(39));

/**
 * Checks if the date is Whit Monday (50 days after Easter Sunday)
 */
export const isWhitMonday = defineHoliday(
  "Lundi de Pentecôte",
  isEasterOffset(50)
);

/**
 * Checks if the date is the National Day (June 23)
 */
export const isNationalDay = defineHoliday(
  "Fête nationale",
  isFixedDate(6, 23)
);

/**
 * Checks if the date is Assumption Day (August 15)
 */
export const isAssumptionDay = defineHoliday("Assomption", isFixedDate(8, 15));

/**
 * Checks if the date is All Saints' Day (November 1)
 */
export const isAllSaintsDay = defineHoliday("Toussaint", isFixedDate(11, 1));

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday("Noël", isFixedDate(12, 25));

/**
 * Checks if the date is St. Stephen's Day / second day of Christmas (December 26)
 */
export const isStStephensDay = defineHoliday(
  "Saint-Étienne",
  isFixedDate(12, 26)
);

/**
 * Returns all Luxembourg legal public holiday matchers (art. L. 232-2 Code du travail)
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isEasterMonday,
  isLabourDay,
  isEuropeDay,
  isAscensionDay,
  isWhitMonday,
  isNationalDay,
  isAssumptionDay,
  isAllSaintsDay,
  isChristmasDay,
  isStStephensDay,
];
