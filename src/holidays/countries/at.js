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
export const isNewYearsDay = defineHoliday("Neujahr", isFixedDate(1, 1));

/**
 * Checks if the date is Epiphany (January 6)
 */
export const isEpiphany = defineHoliday(
  "Heilige Drei Könige",
  isFixedDate(1, 6)
);

/**
 * Checks if the date is Easter Monday (day after Easter Sunday)
 */
export const isEasterMonday = defineHoliday("Ostermontag", isEasterOffset(1));

/**
 * Checks if the date is the State Holiday / Labour Day (May 1)
 */
export const isStateHoliday = defineHoliday(
  "Staatsfeiertag",
  isFixedDate(5, 1)
);

/**
 * Checks if the date is Ascension Day (39 days after Easter Sunday)
 */
export const isAscensionDay = defineHoliday(
  "Christi Himmelfahrt",
  isEasterOffset(39)
);

/**
 * Checks if the date is Whit Monday (50 days after Easter Sunday)
 */
export const isWhitMonday = defineHoliday("Pfingstmontag", isEasterOffset(50));

/**
 * Checks if the date is Corpus Christi (60 days after Easter Sunday)
 */
export const isCorpusChristi = defineHoliday(
  "Fronleichnam",
  isEasterOffset(60)
);

/**
 * Checks if the date is Assumption Day (August 15)
 */
export const isAssumptionDay = defineHoliday(
  "Mariä Himmelfahrt",
  isFixedDate(8, 15)
);

/**
 * Checks if the date is the National Day (October 26)
 */
export const isNationalDay = defineHoliday(
  "Nationalfeiertag",
  isFixedDate(10, 26)
);

/**
 * Checks if the date is All Saints' Day (November 1)
 */
export const isAllSaintsDay = defineHoliday(
  "Allerheiligen",
  isFixedDate(11, 1)
);

/**
 * Checks if the date is Immaculate Conception (December 8)
 */
export const isImmaculateConception = defineHoliday(
  "Mariä Empfängnis",
  isFixedDate(12, 8)
);

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday("Christtag", isFixedDate(12, 25));

/**
 * Checks if the date is St. Stephen's Day (December 26)
 */
export const isStStephensDay = defineHoliday("Stefanitag", isFixedDate(12, 26));

/**
 * Returns all Austrian nationwide public holiday matchers (§ 7 Arbeitsruhegesetz).
 * Good Friday is not a public holiday; the state patron-saint days (e.g. St. Josef,
 * St. Florian, St. Rupert, St. Leopold, St. Martin) are not statutory holidays for
 * the general workforce and are therefore not included.
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isEpiphany,
  isEasterMonday,
  isStateHoliday,
  isAscensionDay,
  isWhitMonday,
  isCorpusChristi,
  isAssumptionDay,
  isNationalDay,
  isAllSaintsDay,
  isImmaculateConception,
  isChristmasDay,
  isStStephensDay,
];
