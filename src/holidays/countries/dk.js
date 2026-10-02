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
export const isNewYearsDay = defineHoliday("Nytårsdag", isFixedDate(1, 1));

/**
 * Checks if the date is Maundy Thursday (Thursday before Easter Sunday)
 */
export const isMaundyThursday = defineHoliday(
  "Skærtorsdag",
  isEasterOffset(-3)
);

/**
 * Checks if the date is Good Friday (Friday before Easter Sunday)
 */
export const isGoodFriday = defineHoliday("Langfredag", isEasterOffset(-2));

/**
 * Checks if the date is Easter Sunday
 */
export const isEasterSunday = defineHoliday("Påskedag", isEasterOffset(0));

/**
 * Checks if the date is Easter Monday (day after Easter Sunday)
 */
export const isEasterMonday = defineHoliday("2. påskedag", isEasterOffset(1));

/**
 * Checks if the date is Great Prayer Day (4th Friday after Easter Sunday).
 * Abolished as a public holiday from 2024 (law of 28 February 2023): only matches years before 2024.
 */
export const isGreatPrayerDay = defineHoliday("Store bededag", (date) => {
  if (date.year >= 2024) return false;
  return isEasterOffset(26)(date);
});

/**
 * Checks if the date is Ascension Day (39 days after Easter Sunday)
 */
export const isAscensionDay = defineHoliday(
  "Kristi himmelfartsdag",
  isEasterOffset(39)
);

/**
 * Checks if the date is Whit Sunday (49 days after Easter Sunday)
 */
export const isWhitSunday = defineHoliday("Pinsedag", isEasterOffset(49));

/**
 * Checks if the date is Whit Monday (50 days after Easter Sunday)
 */
export const isWhitMonday = defineHoliday("2. pinsedag", isEasterOffset(50));

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday("Juledag", isFixedDate(12, 25));

/**
 * Checks if the date is the Second Day of Christmas (December 26)
 */
export const isSecondChristmasDay = defineHoliday(
  "2. juledag",
  isFixedDate(12, 26)
);

/**
 * Returns all Danish public holiday matchers (helligdage).
 * Grundlovsdag (June 5), Juleaftensdag (December 24) and Nytårsaftensdag (December 31)
 * are not statutory public holidays (only shop-closing days / collective agreements) and are left out.
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isMaundyThursday,
  isGoodFriday,
  isEasterSunday,
  isEasterMonday,
  isGreatPrayerDay,
  isAscensionDay,
  isWhitSunday,
  isWhitMonday,
  isChristmasDay,
  isSecondChristmasDay,
];
