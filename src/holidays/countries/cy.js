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
 * Checks if the date is Clean Monday (48 days before Orthodox Easter Sunday)
 */
export const isCleanMonday = defineHoliday(
  "Καθαρά Δευτέρα",
  isOrthodoxEasterOffset(-48)
);

/**
 * Checks if the date is Greek Independence Day / Annunciation (March 25)
 */
export const isGreekIndependenceDay = defineHoliday(
  "Εθνική Επέτειος 25ης Μαρτίου",
  isFixedDate(3, 25)
);

/**
 * Checks if the date is Cyprus National Day, anniversary of the EOKA struggle (April 1)
 */
export const isNationalDay = defineHoliday(
  "Εθνική Επέτειος 1ης Απριλίου",
  isFixedDate(4, 1)
);

/**
 * Checks if the date is Orthodox Good Friday (2 days before Orthodox Easter Sunday)
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
 * Checks if the date is Whit Monday / Kataklysmos (50 days after Orthodox Easter Sunday)
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
 * Checks if the date is Cyprus Independence Day (October 1)
 */
export const isIndependenceDay = defineHoliday(
  "Ημέρα Ανεξαρτησίας της Κύπρου",
  isFixedDate(10, 1)
);

/**
 * Checks if the date is Ochi Day / Greek National Day (October 28)
 */
export const isOchiDay = defineHoliday(
  "Επέτειος 28ης Οκτωβρίου",
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
 * Checks if the date is the second day of Christmas (December 26)
 */
export const isSecondDayOfChristmas = defineHoliday(
  "Δεύτερη μέρα των Χριστουγέννων",
  isFixedDate(12, 26)
);

/**
 * Returns all Cypriot nationwide public holiday matchers.
 *
 * Easter Tuesday and Christmas Eve are non-working only for banks and the public
 * service and are therefore not included.
 *
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isEpiphany,
  isCleanMonday,
  isGreekIndependenceDay,
  isNationalDay,
  isGoodFriday,
  isEasterMonday,
  isLabourDay,
  isWhitMonday,
  isAssumptionDay,
  isIndependenceDay,
  isOchiDay,
  isChristmasDay,
  isSecondDayOfChristmas,
];
