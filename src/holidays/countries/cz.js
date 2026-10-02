import { defineHoliday, isFixedDate, isEasterOffset } from "../utils.js";

/** @typedef {import("luxon").DateTime} DateTime */

/**
 * A predicate that returns true when the given date is a holiday.
 * @callback HolidayMatcher
 * @param {DateTime} date
 * @returns {boolean}
 */

/**
 * Checks if the date is New Year's Day (January 1), which is also the
 * state holiday "Den obnovy samostatného českého státu"
 */
export const isNewYearsDay = defineHoliday("Nový rok", isFixedDate(1, 1));

/**
 * Checks if the date is Good Friday (2 days before Easter Sunday).
 * A public holiday since 2016.
 */
export const isGoodFriday = defineHoliday("Velký pátek", (date) => {
  return date.year >= 2016 && isEasterOffset(-2)(date);
});

/**
 * Checks if the date is Easter Monday (day after Easter Sunday)
 */
export const isEasterMonday = defineHoliday(
  "Velikonoční pondělí",
  isEasterOffset(1)
);

/**
 * Checks if the date is Labour Day (May 1)
 */
export const isLabourDay = defineHoliday("Svátek práce", isFixedDate(5, 1));

/**
 * Checks if the date is Victory Day (May 8)
 */
export const isVictoryDay = defineHoliday("Den vítězství", isFixedDate(5, 8));

/**
 * Checks if the date is Saints Cyril and Methodius Day (July 5)
 */
export const isSaintsCyrilAndMethodiusDay = defineHoliday(
  "Den slovanských věrozvěstů Cyrila a Metoděje",
  isFixedDate(7, 5)
);

/**
 * Checks if the date is Jan Hus Day (July 6)
 */
export const isJanHusDay = defineHoliday(
  "Den upálení mistra Jana Husa",
  isFixedDate(7, 6)
);

/**
 * Checks if the date is Czech Statehood Day (September 28)
 */
export const isStatehoodDay = defineHoliday(
  "Den české státnosti",
  isFixedDate(9, 28)
);

/**
 * Checks if the date is Independent Czechoslovak State Day (October 28)
 */
export const isIndependenceDay = defineHoliday(
  "Den vzniku samostatného československého státu",
  isFixedDate(10, 28)
);

/**
 * Checks if the date is Struggle for Freedom and Democracy Day (November 17)
 */
export const isFreedomAndDemocracyDay = defineHoliday(
  "Den boje za svobodu a demokracii",
  isFixedDate(11, 17)
);

/**
 * Checks if the date is Christmas Eve (December 24)
 */
export const isChristmasEve = defineHoliday("Štědrý den", isFixedDate(12, 24));

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday(
  "1. svátek vánoční",
  isFixedDate(12, 25)
);

/**
 * Checks if the date is the second day of Christmas / St. Stephen's Day (December 26)
 */
export const isSecondChristmasDay = defineHoliday(
  "2. svátek vánoční",
  isFixedDate(12, 26)
);

/**
 * Returns all Czech nationwide public holiday matchers
 * (both "státní svátky" and "ostatní svátky" are non-working days)
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isGoodFriday,
  isEasterMonday,
  isLabourDay,
  isVictoryDay,
  isSaintsCyrilAndMethodiusDay,
  isJanHusDay,
  isStatehoodDay,
  isIndependenceDay,
  isFreedomAndDemocracyDay,
  isChristmasEve,
  isChristmasDay,
  isSecondChristmasDay,
];
