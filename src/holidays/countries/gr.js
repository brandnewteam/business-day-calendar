import {
  defineHoliday,
  isFixedDate,
  isOrthodoxEasterOffset,
} from "../utils.js";

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
export const isNewYearsDay = defineHoliday("Πρωτοχρονιά", isFixedDate(1, 1));

/**
 * Checks if the date is Epiphany / Theophany (January 6)
 */
export const isEpiphany = defineHoliday("Θεοφάνεια", isFixedDate(1, 6));

/**
 * Checks if the date is Clean Monday (48 days before Orthodox Easter Sunday).
 * Customary holiday: non-working for the public sector and banks, but not one of the
 * mandatory private-sector holidays of law 4808/2021 art. 60.
 */
export const isCleanMonday = defineHoliday(
  "Καθαρά Δευτέρα",
  isOrthodoxEasterOffset(-48)
);

/**
 * Checks if the date is Greek Independence Day / Annunciation (March 25)
 */
export const isIndependenceDay = defineHoliday(
  "Εθνική Επέτειος 25ης Μαρτίου",
  isFixedDate(3, 25)
);

/**
 * Checks if the date is Orthodox Good Friday (2 days before Orthodox Easter Sunday).
 * Customary holiday: non-working for the public sector and banks, but not one of the
 * mandatory private-sector holidays of law 4808/2021 art. 60.
 */
export const isGoodFriday = defineHoliday(
  "Μεγάλη Παρασκευή",
  isOrthodoxEasterOffset(-2)
);

/**
 * Checks if the date is Orthodox Easter Monday (1 day after Orthodox Easter Sunday)
 */
export const isEasterMonday = defineHoliday(
  "Δευτέρα του Πάσχα",
  isOrthodoxEasterOffset(1)
);

/**
 * Checks if the date is Labour Day (May 1)
 */
export const isLabourDay = defineHoliday("Πρωτομαγιά", isFixedDate(5, 1));

/**
 * Checks if the date is Whit Monday / Holy Spirit Monday (50 days after Orthodox Easter Sunday).
 * Customary holiday: non-working for the public sector and banks, but not one of the
 * mandatory private-sector holidays of law 4808/2021 art. 60.
 */
export const isWhitMonday = defineHoliday(
  "Αγίου Πνεύματος",
  isOrthodoxEasterOffset(50)
);

/**
 * Checks if the date is the Dormition of the Theotokos (August 15)
 */
export const isAssumptionDay = defineHoliday(
  "Κοίμηση της Θεοτόκου",
  isFixedDate(8, 15)
);

/**
 * Checks if the date is Ochi Day (October 28)
 */
export const isOchiDay = defineHoliday(
  "Εθνική Επέτειος 28ης Οκτωβρίου",
  isFixedDate(10, 28)
);

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday(
  "Χριστούγεννα",
  isFixedDate(12, 25)
);

/**
 * Checks if the date is the Synaxis of the Theotokos / second day of Christmas (December 26)
 */
export const isSynaxisOfTheTheotokos = defineHoliday(
  "Σύναξη της Θεοτόκου",
  isFixedDate(12, 26)
);

/**
 * Returns the Greek nationwide public holiday matchers.
 *
 * By default only the nine mandatory holidays of law 4808/2021 art. 60 (non-working for
 * the whole workforce) are returned. Clean Monday, Good Friday and Whit Monday are
 * "customary" holidays (public sector, banks and many collective agreements) and are
 * included only when `includeCustomary` is true.
 *
 * @param {boolean} [includeCustomary=false] - If true, also returns the customary holidays
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = (includeCustomary = false) => {
  /** @type {HolidayMatcher[]} */
  const statutory = [
    isNewYearsDay,
    isEpiphany,
    isIndependenceDay,
    isEasterMonday,
    isLabourDay,
    isAssumptionDay,
    isOchiDay,
    isChristmasDay,
    isSynaxisOfTheTheotokos,
  ];

  if (!includeCustomary) return statutory;

  return [...statutory, isCleanMonday, isGoodFriday, isWhitMonday];
};
