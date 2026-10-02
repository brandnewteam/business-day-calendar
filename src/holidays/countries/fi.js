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
export const isNewYearsDay = defineHoliday(
  "Uudenvuodenpäivä",
  isFixedDate(1, 1)
);

/**
 * Checks if the date is Epiphany (January 6)
 */
export const isEpiphany = defineHoliday("Loppiainen", isFixedDate(1, 6));

/**
 * Checks if the date is Good Friday (Friday before Easter Sunday)
 */
export const isGoodFriday = defineHoliday("Pitkäperjantai", isEasterOffset(-2));

/**
 * Checks if the date is Easter Sunday
 */
export const isEasterSunday = defineHoliday("Pääsiäispäivä", isEasterOffset(0));

/**
 * Checks if the date is Easter Monday (day after Easter Sunday)
 */
export const isEasterMonday = defineHoliday(
  "Toinen pääsiäispäivä",
  isEasterOffset(1)
);

/**
 * Checks if the date is May Day (May 1)
 */
export const isMayDay = defineHoliday("Vappu", isFixedDate(5, 1));

/**
 * Checks if the date is Ascension Day (39 days after Easter Sunday)
 */
export const isAscensionDay = defineHoliday("Helatorstai", isEasterOffset(39));

/**
 * Checks if the date is Whit Sunday (49 days after Easter Sunday)
 */
export const isWhitSunday = defineHoliday("Helluntaipäivä", isEasterOffset(49));

/**
 * Checks if the date is Midsummer Day (the Saturday between June 20 and June 26)
 */
export const isMidsummerDay = defineHoliday(
  "Juhannuspäivä",
  (date) =>
    date.weekday === 6 && date.month === 6 && date.day >= 20 && date.day <= 26
);

/**
 * Checks if the date is All Saints' Day (the Saturday between October 31 and November 6)
 */
export const isAllSaintsDay = defineHoliday(
  "Pyhäinpäivä",
  (date) =>
    date.weekday === 6 &&
    ((date.month === 10 && date.day === 31) ||
      (date.month === 11 && date.day <= 6))
);

/**
 * Checks if the date is Independence Day (December 6)
 */
export const isIndependenceDay = defineHoliday(
  "Itsenäisyyspäivä",
  isFixedDate(12, 6)
);

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday("Joulupäivä", isFixedDate(12, 25));

/**
 * Checks if the date is St. Stephen's Day / Second Day of Christmas (December 26)
 */
export const isStStephensDay = defineHoliday(
  "Tapaninpäivä",
  isFixedDate(12, 26)
);

/**
 * Returns all Finnish public holiday matchers.
 * Juhannusaatto (Midsummer Eve), Jouluaatto (Christmas Eve) and Uudenvuodenaatto (New Year's Eve)
 * are days off by collective agreement only, not statutory holidays, and are left out.
 * Åland's Autonomy Day (June 9) is a paid day off only for Åland's public-sector employees,
 * not a statutory holiday for the general workforce, so no regional sets are provided.
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
  isMidsummerDay,
  isAllSaintsDay,
  isIndependenceDay,
  isChristmasDay,
  isStStephensDay,
];
