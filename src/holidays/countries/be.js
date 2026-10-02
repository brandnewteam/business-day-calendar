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
export const isNewYearsDay = defineHoliday("Nieuwjaar", isFixedDate(1, 1));

/**
 * Checks if the date is Easter Monday (day after Easter Sunday)
 */
export const isEasterMonday = defineHoliday("Paasmaandag", isEasterOffset(1));

/**
 * Checks if the date is Labour Day (May 1)
 */
export const isLabourDay = defineHoliday(
  "Dag van de Arbeid",
  isFixedDate(5, 1)
);

/**
 * Checks if the date is Ascension Day (39 days after Easter Sunday)
 */
export const isAscensionDay = defineHoliday(
  "Hemelvaartsdag",
  isEasterOffset(39)
);

/**
 * Checks if the date is Whit Monday (50 days after Easter Sunday)
 */
export const isWhitMonday = defineHoliday(
  "Pinkstermaandag",
  isEasterOffset(50)
);

/**
 * Checks if the date is the Belgian National Day (July 21)
 */
export const isNationalDay = defineHoliday(
  "Nationale feestdag",
  isFixedDate(7, 21)
);

/**
 * Checks if the date is Assumption Day (August 15)
 */
export const isAssumptionDay = defineHoliday(
  "Onze-Lieve-Vrouw-Hemelvaart",
  isFixedDate(8, 15)
);

/**
 * Checks if the date is All Saints' Day (November 1)
 */
export const isAllSaintsDay = defineHoliday(
  "Allerheiligen",
  isFixedDate(11, 1)
);

/**
 * Checks if the date is Armistice Day (November 11)
 */
export const isArmisticeDay = defineHoliday(
  "Wapenstilstand",
  isFixedDate(11, 11)
);

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday("Kerstmis", isFixedDate(12, 25));

/**
 * Returns the ten Belgian legal public holiday matchers.
 * When a holiday falls on a Sunday or a usual rest day the law requires a replacement day,
 * chosen per sector or company; that cannot be modelled here. Community holidays
 * (11 July, 27 September, 15 November) are not legal holidays.
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isEasterMonday,
  isLabourDay,
  isAscensionDay,
  isWhitMonday,
  isNationalDay,
  isAssumptionDay,
  isAllSaintsDay,
  isArmisticeDay,
  isChristmasDay,
];
