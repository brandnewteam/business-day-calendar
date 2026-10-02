import {
  defineHoliday,
  isFixedDate,
  isEasterOffset,
  isNthWeekdayOfMonth,
} from "../utils.js";

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
export const isNewYearsDay = defineHoliday("Naujieji metai", isFixedDate(1, 1));

/**
 * Checks if the date is the Day of Restoration of the State of Lithuania (February 16)
 */
export const isRestorationOfTheStateDay = defineHoliday(
  "Lietuvos valstybės atkūrimo diena",
  isFixedDate(2, 16)
);

/**
 * Checks if the date is the Day of Restoration of Independence of Lithuania (March 11)
 */
export const isRestorationOfIndependenceDay = defineHoliday(
  "Lietuvos nepriklausomybės atkūrimo diena",
  isFixedDate(3, 11)
);

/**
 * Checks if the date is Easter Sunday
 */
export const isEasterSunday = defineHoliday("Velykos", isEasterOffset(0));

/**
 * Checks if the date is Easter Monday (day after Easter Sunday)
 */
export const isEasterMonday = defineHoliday(
  "Antroji Velykų diena",
  isEasterOffset(1)
);

/**
 * Checks if the date is International Workers' Day (May 1)
 */
export const isLabourDay = defineHoliday(
  "Tarptautinė darbo diena",
  isFixedDate(5, 1)
);

/**
 * Checks if the date is Mother's Day (first Sunday of May)
 */
export const isMothersDay = defineHoliday(
  "Motinos diena",
  isNthWeekdayOfMonth(5, 7, 1)
);

/**
 * Checks if the date is Father's Day (first Sunday of June)
 */
export const isFathersDay = defineHoliday(
  "Tėvo diena",
  isNthWeekdayOfMonth(6, 7, 1)
);

/**
 * Checks if the date is St. John's Day / Midsummer (June 24)
 */
export const isStJohnsDay = defineHoliday("Joninės", isFixedDate(6, 24));

/**
 * Checks if the date is Statehood Day, coronation of King Mindaugas (July 6)
 */
export const isStatehoodDay = defineHoliday(
  "Valstybės diena",
  isFixedDate(7, 6)
);

/**
 * Checks if the date is Assumption Day (August 15)
 */
export const isAssumptionDay = defineHoliday("Žolinė", isFixedDate(8, 15));

/**
 * Checks if the date is All Saints' Day (November 1)
 */
export const isAllSaintsDay = defineHoliday(
  "Visų šventųjų diena",
  isFixedDate(11, 1)
);

/**
 * Checks if the date is All Souls' Day (November 2).
 * A public holiday since 2020 (law of 20 August 2019): only matches years from 2020 onwards.
 */
export const isAllSoulsDay = defineHoliday(
  "Vėlinės",
  (date) => date.year >= 2020 && date.month === 11 && date.day === 2
);

/**
 * Checks if the date is Christmas Eve (December 24)
 */
export const isChristmasEve = defineHoliday("Kūčios", isFixedDate(12, 24));

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday("Kalėdos", isFixedDate(12, 25));

/**
 * Checks if the date is the Second Day of Christmas (December 26)
 */
export const isSecondChristmasDay = defineHoliday(
  "Antroji Kalėdų diena",
  isFixedDate(12, 26)
);

/**
 * Returns all Lithuanian public holiday matchers (švenčių dienos, Labour Code art. 123)
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isRestorationOfTheStateDay,
  isRestorationOfIndependenceDay,
  isEasterSunday,
  isEasterMonday,
  isLabourDay,
  isMothersDay,
  isFathersDay,
  isStJohnsDay,
  isStatehoodDay,
  isAssumptionDay,
  isAllSaintsDay,
  isAllSoulsDay,
  isChristmasEve,
  isChristmasDay,
  isSecondChristmasDay,
];
