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
export const isNewYearsDay = defineHoliday("Újév", isFixedDate(1, 1));

/**
 * Checks if the date is the 1848 Revolution Memorial Day (March 15)
 */
export const isRevolutionDay1848 = defineHoliday(
  "Az 1848-as forradalom és szabadságharc ünnepe",
  isFixedDate(3, 15)
);

/**
 * Checks if the date is Good Friday (2 days before Easter Sunday).
 * A public holiday since 2017.
 */
export const isGoodFriday = defineHoliday("Nagypéntek", (date) => {
  return date.year >= 2017 && isEasterOffset(-2)(date);
});

/**
 * Checks if the date is Easter Monday (day after Easter Sunday)
 */
export const isEasterMonday = defineHoliday("Húsvéthétfő", isEasterOffset(1));

/**
 * Checks if the date is Labour Day (May 1)
 */
export const isLabourDay = defineHoliday("A munka ünnepe", isFixedDate(5, 1));

/**
 * Checks if the date is Whit Monday (50 days after Easter Sunday)
 */
export const isWhitMonday = defineHoliday("Pünkösdhétfő", isEasterOffset(50));

/**
 * Checks if the date is State Foundation Day (August 20)
 */
export const isStateFoundationDay = defineHoliday(
  "Az államalapítás ünnepe",
  isFixedDate(8, 20)
);

/**
 * Checks if the date is the 1956 Revolution Memorial Day (October 23)
 */
export const isRevolutionDay1956 = defineHoliday(
  "Az 1956-os forradalom és szabadságharc ünnepe",
  isFixedDate(10, 23)
);

/**
 * Checks if the date is All Saints' Day (November 1)
 */
export const isAllSaintsDay = defineHoliday(
  "Mindenszentek",
  isFixedDate(11, 1)
);

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday("Karácsony", isFixedDate(12, 25));

/**
 * Checks if the date is the second day of Christmas (December 26)
 */
export const isSecondChristmasDay = defineHoliday(
  "Karácsony másnapja",
  isFixedDate(12, 26)
);

/**
 * Returns all Hungarian nationwide public holiday matchers
 * ("munkaszüneti napok" under Section 102 of the Labour Code, Act I of 2012).
 *
 * Limitation: the yearly ministerial decree that swaps working days around holidays
 * ("bridge days", e.g. a Saturday worked in exchange for a Friday off) is not modelled.
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isRevolutionDay1848,
  isGoodFriday,
  isEasterMonday,
  isLabourDay,
  isWhitMonday,
  isStateFoundationDay,
  isRevolutionDay1956,
  isAllSaintsDay,
  isChristmasDay,
  isSecondChristmasDay,
];
