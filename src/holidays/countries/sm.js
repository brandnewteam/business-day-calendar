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
 * Checks if the date is the Feast of Saint Agatha / Anniversary of the Liberation from Cardinal Alberoni (February 5)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isSaintAgathaDay = (date) => date.month === 2 && date.day === 5;

/**
 * Checks if the date is the Anniversary of the Arengo (March 25)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isArengoAnniversary = (date) =>
  date.month === 3 && date.day === 25;

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
 * Checks if the date is Corpus Domini (60 days after Easter Sunday)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isCorpusDomini = (date) => {
  const easterSunday = calculateEaster(date.year);
  const corpusDomini = DateTime.fromObject({
    year: easterSunday.year,
    month: easterSunday.month,
    day: easterSunday.day,
  }).plus({ days: 60 });

  return date.month === corpusDomini.month && date.day === corpusDomini.day;
};

/**
 * Checks if the date is Workers' Day / Labor Day (May 1)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isWorkersDay = (date) => date.month === 5 && date.day === 1;

/**
 * Checks if the date is the Fall of the Fascist Regime / Freedom Day (July 28)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isFreedomDay = (date) => date.month === 7 && date.day === 28;

/**
 * Checks if the date is Ferragosto / Assumption Day (August 15)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isAssumptionDay = (date) => date.month === 8 && date.day === 15;

/**
 * Checks if the date is the Foundation of the Republic (September 3)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isRepublicDay = (date) => date.month === 9 && date.day === 3;

/**
 * Checks if the date is All Saints' Day (November 1)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isAllSaintsDay = (date) => date.month === 11 && date.day === 1;

/**
 * Checks if the date is All Souls' Day (November 2)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isAllSoulsDay = (date) => date.month === 11 && date.day === 2;

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
 * Checks if the date is Saint Stephen's Day (December 26)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isStStephensDay = (date) => date.month === 12 && date.day === 26;

/**
 * Returns all San Marino Holiday matchers
 * @returns {Array<function(DateTime): boolean>}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isEpiphany,
  isSaintAgathaDay,
  isArengoAnniversary,
  isEasterSunday,
  isEasterMonday,
  isWorkersDay,
  isCorpusDomini,
  isFreedomDay,
  isAssumptionDay,
  isRepublicDay,
  isAllSaintsDay,
  isAllSoulsDay,
  isImmaculateConception,
  isChristmasDay,
  isStStephensDay,
];
