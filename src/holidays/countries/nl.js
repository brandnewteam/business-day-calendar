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
export const isNewYearsDay = defineHoliday("Nieuwjaarsdag", isFixedDate(1, 1));

/**
 * Checks if the date is Good Friday (Friday before Easter Sunday).
 * Listed by the government as an official holiday, but it is a day off only for the
 * public sector, banks and some collective agreements, so it is NOT part of `getHolidays`.
 */
export const isGoodFriday = defineHoliday("Goede Vrijdag", isEasterOffset(-2));

/**
 * Checks if the date is Easter Sunday
 */
export const isEasterSunday = defineHoliday(
  "Eerste Paasdag",
  isEasterOffset(0)
);

/**
 * Checks if the date is Easter Monday (day after Easter Sunday)
 */
export const isEasterMonday = defineHoliday(
  "Tweede Paasdag",
  isEasterOffset(1)
);

/**
 * Checks if the date is King's Day (April 27, or Saturday April 26 when the 27th is a Sunday),
 * celebrated since 2014.
 */
export const isKingsDay = defineHoliday("Koningsdag", (date) => {
  if (date.year < 2014 || date.month !== 4) return false;
  const kingsDay = date.set({ day: 27 });
  return kingsDay.weekday === 7 ? date.day === 26 : date.day === 27;
});

/**
 * Checks if the date is Queen's Day (April 30, or Saturday April 29 when the 30th is a Sunday)
 * as celebrated under Queen Beatrix, 1980 to 2013. Earlier years are not modelled.
 */
export const isQueensDay = defineHoliday("Koninginnedag", (date) => {
  if (date.year < 1980 || date.year > 2013 || date.month !== 4) return false;
  const queensDay = date.set({ day: 30 });
  return queensDay.weekday === 7 ? date.day === 29 : date.day === 30;
});

/**
 * Checks if the date is Liberation Day (May 5).
 * Official national holiday, but NOT a statutory day off: most collective agreements grant
 * it only every five years (lustrum years, e.g. 2025, 2030), so it is NOT part of `getHolidays`.
 */
export const isLiberationDay = defineHoliday(
  "Bevrijdingsdag",
  isFixedDate(5, 5)
);

/**
 * Checks if the date is Ascension Day (39 days after Easter Sunday)
 */
export const isAscensionDay = defineHoliday(
  "Hemelvaartsdag",
  isEasterOffset(39)
);

/**
 * Checks if the date is Whit Sunday (49 days after Easter Sunday)
 */
export const isWhitSunday = defineHoliday(
  "Eerste Pinksterdag",
  isEasterOffset(49)
);

/**
 * Checks if the date is Whit Monday (50 days after Easter Sunday)
 */
export const isWhitMonday = defineHoliday(
  "Tweede Pinksterdag",
  isEasterOffset(50)
);

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday(
  "Eerste Kerstdag",
  isFixedDate(12, 25)
);

/**
 * Checks if the date is St. Stephen's Day / Boxing Day (December 26)
 */
export const isStStephensDay = defineHoliday(
  "Tweede Kerstdag",
  isFixedDate(12, 26)
);

/**
 * Returns the Dutch public holiday matchers that are generally non-working days.
 * `isGoodFriday` and `isLiberationDay` are exported but excluded (see their JSDoc);
 * combine them yourself if your collective agreement grants them.
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isEasterSunday,
  isEasterMonday,
  isKingsDay,
  isQueensDay,
  isAscensionDay,
  isWhitSunday,
  isWhitMonday,
  isChristmasDay,
  isStStephensDay,
];
