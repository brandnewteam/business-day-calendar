import { DateTime } from "luxon";
import { calculateEaster } from "../utils.js";

/**
 * Checks if the date is New Year's Day (January 1)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isNewYearsDay = (date) => date.month === 1 && date.day === 1;

/**
 * Checks if the date is Epiphany (January 6)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isEpiphany = (date) => date.month === 1 && date.day === 6;

/**
 * Checks if the date is Easter Sunday (calculated using the utility function)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isEasterSunday = (date) => {
  const easter = calculateEaster(date.year);
  return date.month === easter.month && date.day === easter.day;
};

/**
 * Checks if the date is Easter Monday (calculated using the utility function)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isEasterMonday = (date) => {
  const easterSunday = calculateEaster(date.year);
  const easterMonday = DateTime.fromObject({
    year: easterSunday.year,
    month: easterSunday.month,
    day: easterSunday.day,
  }).plus({ days: 1 });

  return date.month === easterMonday.month && date.day === easterMonday.day;
};

/**
 * Checks if the date is Liberation Day (April 25)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isItalianLiberationDay = (date) =>
  date.month === 4 && date.day === 25;

/**
 * Checks if the date is Labor Day / May Day (May 1)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isWorkersDay = (date) => date.month === 5 && date.day === 1;

/**
 * Checks if the date is Republic Day (June 2)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isItalianRepublicDay = (date) =>
  date.month === 6 && date.day === 2;

/**
 * Checks if the date is Ferragosto / Assumption Day (August 15)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isAssumptionDay = (date) => date.month === 8 && date.day === 15;

/**
 * Checks if the date is All Saints' Day (November 1)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isAllSaintsDay = (date) => date.month === 11 && date.day === 1;

/**
 * Checks if the date is Immaculate Conception (December 8)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isImmaculateConception = (date) =>
  date.month === 12 && date.day === 8;

/**
 * Checks if the date is Christmas Day (December 25)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isChristmasDay = (date) => date.month === 12 && date.day === 25;

/**
 * Checks if the date is St. Stephen's Day (December 26)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isStStephensDay = (date) => date.month === 12 && date.day === 26;

/**
 * Returns all common Italian Holiday matchers
 * @returns {Array<function(DateTime): boolean>}
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
  isAllSaintsDay,
  isImmaculateConception,
  isChristmasDay,
  isStStephensDay,
];
