import { DateTime } from "luxon";
import { calculateEaster, defineHoliday } from "../utils.js";

/**
 * A predicate that returns true when the given date is a holiday.
 * @callback HolidayMatcher
 * @param {DateTime} date
 * @returns {boolean}
 */

/**
 * Checks if the date is New Year's Day (January 1)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isNewYearsDay = defineHoliday(
  "Capodanno",
  (date) => date.month === 1 && date.day === 1
);

/**
 * Checks if the date is Epiphany (January 6)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isEpiphany = defineHoliday(
  "Epifania",
  (date) => date.month === 1 && date.day === 6
);

/**
 * Checks if the date is Easter Sunday (calculated using the utility function)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isEasterSunday = defineHoliday("Pasqua", (date) => {
  const easter = calculateEaster(date.year);
  return date.month === easter.month && date.day === easter.day;
});

/**
 * Checks if the date is Easter Monday (calculated using the utility function)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isEasterMonday = defineHoliday("Lunedì dell'Angelo", (date) => {
  const easterSunday = calculateEaster(date.year);
  const easterMonday = DateTime.fromObject({
    year: easterSunday.year,
    month: easterSunday.month,
    day: easterSunday.day,
  }).plus({ days: 1 });

  return date.month === easterMonday.month && date.day === easterMonday.day;
});

/**
 * Checks if the date is Liberation Day (April 25)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isItalianLiberationDay = defineHoliday(
  "Festa della Liberazione",
  (date) => date.month === 4 && date.day === 25
);

/**
 * Checks if the date is Labor Day / May Day (May 1)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isWorkersDay = defineHoliday(
  "Festa dei Lavoratori",
  (date) => date.month === 5 && date.day === 1
);

/**
 * Checks if the date is Republic Day (June 2)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isItalianRepublicDay = defineHoliday(
  "Festa della Repubblica",
  (date) => date.month === 6 && date.day === 2
);

/**
 * Checks if the date is Ferragosto / Assumption Day (August 15)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isAssumptionDay = defineHoliday(
  "Assunzione di Maria",
  (date) => date.month === 8 && date.day === 15
);

/**
 * Checks if the date is the Feast of Saint Francis of Assisi, patron saint of Italy (October 4).
 * Reinstated as a national holiday by Law no. 151 of October 8, 2025, in force from 2026.
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isSaintFrancisDay = defineHoliday(
  "San Francesco d'Assisi",
  (date) => date.year >= 2026 && date.month === 10 && date.day === 4
);

/**
 * Checks if the date is All Saints' Day (November 1)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isAllSaintsDay = defineHoliday(
  "Ognissanti",
  (date) => date.month === 11 && date.day === 1
);

/**
 * Checks if the date is Immaculate Conception (December 8)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isImmaculateConception = defineHoliday(
  "Immacolata Concezione",
  (date) => date.month === 12 && date.day === 8
);

/**
 * Checks if the date is Christmas Day (December 25)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isChristmasDay = defineHoliday(
  "Natale",
  (date) => date.month === 12 && date.day === 25
);

/**
 * Checks if the date is St. Stephen's Day (December 26)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isStStephensDay = defineHoliday(
  "Santo Stefano",
  (date) => date.month === 12 && date.day === 26
);

/**
 * Returns all common Italian Holiday matchers
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isEpiphany,
  isEasterSunday,
  isEasterMonday,
  isItalianLiberationDay,
  isWorkersDay,
  isItalianRepublicDay,
  isAssumptionDay,
  isSaintFrancisDay,
  isAllSaintsDay,
  isImmaculateConception,
  isChristmasDay,
  isStStephensDay,
];
