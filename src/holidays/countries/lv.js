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
 * Creates a matcher for a fixed-date holiday that, when it falls on a Saturday or Sunday,
 * also makes the following Monday a day off (law "Par svētku, atceres un atzīmējamām dienām", art. 1).
 * Both the holiday itself and the compensating Monday are matched.
 *
 * @param {number} month - Month (1-12)
 * @param {number} day - Day of the month
 * @returns {HolidayMatcher}
 */
const isFixedDateWithMondayOff = (month, day) => (date) => {
  if (date.month !== month) return false;
  if (date.day === day) return true;
  // The Monday right after the holiday: 1 day later when the holiday is a Sunday, 2 when a Saturday
  return date.weekday === 1 && date.day > day && date.day - day <= 2;
};

/**
 * Checks if the date is New Year's Day (January 1)
 */
export const isNewYearsDay = defineHoliday("Jaungada diena", isFixedDate(1, 1));

/**
 * Checks if the date is Good Friday (Friday before Easter Sunday)
 */
export const isGoodFriday = defineHoliday(
  "Lielā Piektdiena",
  isEasterOffset(-2)
);

/**
 * Checks if the date is Easter Sunday
 */
export const isEasterSunday = defineHoliday("Lieldienas", isEasterOffset(0));

/**
 * Checks if the date is Easter Monday (day after Easter Sunday)
 */
export const isEasterMonday = defineHoliday(
  "Otrās Lieldienas",
  isEasterOffset(1)
);

/**
 * Checks if the date is Labour Day / Convocation of the Constitutional Assembly (May 1)
 */
export const isLabourDay = defineHoliday("Darba svētki", isFixedDate(5, 1));

/**
 * Checks if the date is the Day of Restoration of Independence (May 4), or the following
 * Monday when May 4 falls on a weekend
 */
export const isRestorationOfIndependenceDay = defineHoliday(
  "Latvijas Republikas Neatkarības atjaunošanas diena",
  isFixedDateWithMondayOff(5, 4)
);

/**
 * Checks if the date is Mother's Day (second Sunday of May)
 */
export const isMothersDay = defineHoliday(
  "Mātes diena",
  isNthWeekdayOfMonth(5, 7, 2)
);

/**
 * Checks if the date is Whit Sunday (49 days after Easter Sunday)
 */
export const isWhitSunday = defineHoliday("Vasarsvētki", isEasterOffset(49));

/**
 * Checks if the date is Midsummer Eve / Līgo Day (June 23)
 */
export const isMidsummerEve = defineHoliday("Līgo diena", isFixedDate(6, 23));

/**
 * Checks if the date is Midsummer Day / St. John's Day (June 24)
 */
export const isMidsummerDay = defineHoliday("Jāņu diena", isFixedDate(6, 24));

/**
 * Checks if the date is the Proclamation Day of the Republic of Latvia (November 18), or the
 * following Monday when November 18 falls on a weekend
 */
export const isProclamationDay = defineHoliday(
  "Latvijas Republikas proklamēšanas diena",
  isFixedDateWithMondayOff(11, 18)
);

/**
 * Checks if the date is Christmas Eve (December 24)
 */
export const isChristmasEve = defineHoliday(
  "Ziemassvētku vakars",
  isFixedDate(12, 24)
);

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday(
  "Ziemassvētki",
  isFixedDate(12, 25)
);

/**
 * Checks if the date is the Second Day of Christmas (December 26)
 */
export const isSecondChristmasDay = defineHoliday(
  "Otrie Ziemassvētki",
  isFixedDate(12, 26)
);

/**
 * Checks if the date is New Year's Eve (December 31)
 */
export const isNewYearsEve = defineHoliday(
  "Vecgada diena",
  isFixedDate(12, 31)
);

/**
 * Returns all Latvian public holiday matchers (svētku dienas).
 * Limitations: the closing day of the Latvian Song and Dance Festival (every five years, date set
 * for each edition) and the working-day transfers decided yearly by the Cabinet (bridge days
 * compensated by a working Saturday) cannot be modelled and are left out.
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isGoodFriday,
  isEasterSunday,
  isEasterMonday,
  isLabourDay,
  isRestorationOfIndependenceDay,
  isMothersDay,
  isWhitSunday,
  isMidsummerEve,
  isMidsummerDay,
  isProclamationDay,
  isChristmasEve,
  isChristmasDay,
  isSecondChristmasDay,
  isNewYearsEve,
];
