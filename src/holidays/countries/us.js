// import { DateTime } from "luxon";

/** @typedef {import("luxon").DateTime} DateTime */

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
export const isNewYearsDay = (date) => date.month === 1 && date.day === 1;

/**
 * Checks if the date is Martin Luther King Jr. Day (3rd Monday in January)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isMlkDay = (date) => {
  if (date.month !== 1) return false;
  // Third Monday in January
  return date.weekday === 1 && Math.floor((date.day - 1) / 7) === 2;
};

/**
 * Checks if the date is Presidents' Day (3rd Monday in February)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isPresidentsDay = (date) => {
  if (date.month !== 2) return false;
  // Third Monday in February
  return date.weekday === 1 && Math.floor((date.day - 1) / 7) === 2;
};

/**
 * Checks if the date is Memorial Day (Last Monday in May)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isMemorialDay = (date) => {
  if (date.month !== 5) return false;
  // Last Monday in May (check if it's Monday and there are no more Mondays in the month)
  return date.weekday === 1 && date.plus({ days: 7 }).month !== 5;
};

/**
 * Checks if the date is Independence Day (July 4)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isIndependenceDay = (date) => date.month === 7 && date.day === 4;

/**
 * Checks if the date is Labor Day (1st Monday in September)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isLaborDay = (date) => {
  if (date.month !== 9) return false;
  // First Monday in September
  return date.weekday === 1 && date.day <= 7;
};

/**
 * Checks if the date is Columbus Day/Indigenous Peoples' Day (2nd Monday in October)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isColumbusDay = (date) => {
  if (date.month !== 10) return false;
  // Second Monday in October
  return date.weekday === 1 && date.day > 7 && date.day <= 14;
};

/**
 * Checks if the date is Veterans Day (November 11)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isVeteransDay = (date) => date.month === 11 && date.day === 11;

/**
 * Checks if the date is Thanksgiving Day (4th Thursday in November)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isThanksgivingDay = (date) => {
  if (date.month !== 11) return false;
  // Fourth Thursday in November
  return date.weekday === 4 && Math.floor((date.day - 1) / 7) === 3;
};

/**
 * Checks if the date is the day after Thanksgiving (Black Friday)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isBlackFriday = (date) => {
  if (date.month !== 11) return false;
  // The day after Thanksgiving (4th Thursday + 1 day)
  const dayAfter = date.minus({ days: 1 });
  return (
    dayAfter.month === 11 &&
    dayAfter.weekday === 4 &&
    Math.floor((dayAfter.day - 1) / 7) === 3
  );
};

/**
 * Checks if the date is Christmas Day (December 25)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isChristmasDay = (date) => date.month === 12 && date.day === 25;

/**
 * Checks if the date is Christmas Eve (December 24)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isChristmasEve = (date) => date.month === 12 && date.day === 24;

/**
 * Checks if the date is New Year's Eve (December 31)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isNewYearsEve = (date) => date.month === 12 && date.day === 31;

/**
 * Checks if the date is Juneteenth (June 19)
 * @param {DateTime} date
 * @returns {boolean}
 */
export const isJuneteenth = (date) => date.month === 6 && date.day === 19;

/**
 * Returns all common US Federal Holiday matchers
 * @returns {Array<HolidayMatcher>}
 */
const getUSFederalHolidays = () => [
  isNewYearsDay,
  isMlkDay,
  isPresidentsDay,
  isMemorialDay,
  isJuneteenth,
  isIndependenceDay,
  isLaborDay,
  isColumbusDay,
  isVeteransDay,
  isThanksgivingDay,
  isChristmasDay,
];

/**
 * Returns all common US Holiday matchers including common non-federal holidays
 * @param {boolean} [onlyFederal=false] - If true, only federal holidays are returned
 * @returns {Array<HolidayMatcher>}
 */
export const getHolidays = (onlyFederal = false) => {
  if (onlyFederal) {
    return [...getUSFederalHolidays()];
  }

  return [
    ...getUSFederalHolidays(),
    isChristmasEve,
    isNewYearsEve,
    isBlackFriday,
  ];
};
