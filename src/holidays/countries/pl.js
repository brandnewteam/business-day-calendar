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
export const isNewYearsDay = defineHoliday("Nowy Rok", isFixedDate(1, 1));

/**
 * Checks if the date is Epiphany (January 6)
 */
export const isEpiphany = defineHoliday(
  "Święto Trzech Króli",
  isFixedDate(1, 6)
);

/**
 * Checks if the date is Easter Sunday
 */
export const isEasterSunday = defineHoliday("Wielkanoc", isEasterOffset(0));

/**
 * Checks if the date is Easter Monday (day after Easter Sunday)
 */
export const isEasterMonday = defineHoliday(
  "Poniedziałek Wielkanocny",
  isEasterOffset(1)
);

/**
 * Checks if the date is Labour Day (May 1)
 */
export const isLabourDay = defineHoliday("Święto Pracy", isFixedDate(5, 1));

/**
 * Checks if the date is Constitution Day (May 3)
 */
export const isConstitutionDay = defineHoliday(
  "Święto Narodowe Trzeciego Maja",
  isFixedDate(5, 3)
);

/**
 * Checks if the date is Whit Sunday / Pentecost (49 days after Easter Sunday)
 */
export const isWhitSunday = defineHoliday(
  "Zielone Świątki",
  isEasterOffset(49)
);

/**
 * Checks if the date is Corpus Christi (60 days after Easter Sunday)
 */
export const isCorpusChristi = defineHoliday("Boże Ciało", isEasterOffset(60));

/**
 * Checks if the date is Assumption Day (August 15)
 */
export const isAssumptionDay = defineHoliday(
  "Wniebowzięcie Najświętszej Maryi Panny",
  isFixedDate(8, 15)
);

/**
 * Checks if the date is All Saints' Day (November 1)
 */
export const isAllSaintsDay = defineHoliday(
  "Wszystkich Świętych",
  isFixedDate(11, 1)
);

/**
 * Checks if the date is Independence Day (November 11)
 */
export const isIndependenceDay = defineHoliday(
  "Narodowe Święto Niepodległości",
  isFixedDate(11, 11)
);

/**
 * Checks if the date is Christmas Eve (December 24).
 * A statutory day off from 2025 (amendment of 6 December 2024 to the Act of 18 January 1951).
 */
export const isChristmasEve = defineHoliday(
  "Wigilia Bożego Narodzenia",
  (date) => date.year >= 2025 && date.month === 12 && date.day === 24
);

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday(
  "Boże Narodzenie",
  isFixedDate(12, 25)
);

/**
 * Checks if the date is the second day of Christmas / St. Stephen's Day (December 26)
 */
export const isSecondChristmasDay = defineHoliday(
  "Drugi dzień Bożego Narodzenia",
  isFixedDate(12, 26)
);

/**
 * Returns all Polish nationwide public holiday matchers
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isEpiphany,
  isEasterSunday,
  isEasterMonday,
  isLabourDay,
  isConstitutionDay,
  isWhitSunday,
  isCorpusChristi,
  isAssumptionDay,
  isAllSaintsDay,
  isIndependenceDay,
  isChristmasEve,
  isChristmasDay,
  isSecondChristmasDay,
];
