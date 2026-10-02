import { defineHoliday, isFixedDate, isEasterOffset } from "../utils.js";

/** @typedef {import("luxon").DateTime} DateTime */

/**
 * A predicate that returns true when the given date is a holiday.
 * @callback HolidayMatcher
 * @param {DateTime} date
 * @returns {boolean}
 */

/*
 * French public holidays (jours fériés, Code du travail art. L3133-1) for
 * metropolitan France, plus the two additional holidays of Alsace-Moselle
 * (departments 57 Moselle, 67 Bas-Rhin and 68 Haut-Rhin) under local law.
 */

/**
 * Checks if the date is New Year's Day (January 1)
 */
export const isNewYearsDay = defineHoliday("Jour de l'an", isFixedDate(1, 1));

/**
 * Checks if the date is Good Friday (Friday before Easter Sunday, Alsace-Moselle
 * only)
 */
export const isGoodFriday = defineHoliday("Vendredi saint", isEasterOffset(-2));

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
 * Checks if the date is Victory in Europe Day (May 8)
 */
export const isVictoryDay = defineHoliday("Victoire 1945", isFixedDate(5, 8));

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
 * Checks if the date is Bastille Day / National Day (July 14)
 */
export const isNationalDay = defineHoliday(
  "Fête nationale",
  isFixedDate(7, 14)
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
 * Checks if the date is Armistice Day (November 11)
 */
export const isArmisticeDay = defineHoliday(
  "Armistice 1918",
  isFixedDate(11, 11)
);

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday("Noël", isFixedDate(12, 25));

/**
 * Checks if the date is St. Stephen's Day (December 26, Alsace-Moselle only)
 */
export const isStStephensDay = defineHoliday(
  "Saint-Étienne",
  isFixedDate(12, 26)
);

/**
 * Returns all French nationwide public holiday matchers (metropolitan France)
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isEasterMonday,
  isLabourDay,
  isVictoryDay,
  isAscensionDay,
  isWhitMonday,
  isNationalDay,
  isAssumptionDay,
  isAllSaintsDay,
  isArmisticeDay,
  isChristmasDay,
];

/**
 * Returns the public holiday matchers of the departments that have additional
 * holidays (nationwide + local ones), keyed by ISO 3166-2 code without the "FR-"
 * prefix: "57" (Moselle), "67" (Bas-Rhin) and "68" (Haut-Rhin), which observe
 * Good Friday and St. Stephen's Day under Alsace-Moselle local law.
 * @returns {Record<string, HolidayMatcher[]>}
 */
export const getRegionalHolidays = () => {
  const alsaceMoselle = [...getHolidays(), isGoodFriday, isStStephensDay];
  return {
    57: alsaceMoselle,
    67: [...alsaceMoselle],
    68: [...alsaceMoselle],
  };
};
