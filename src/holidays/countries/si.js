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
export const isNewYearsDay = defineHoliday("Novo leto", isFixedDate(1, 1));

/**
 * Checks if the date is the second day of New Year (January 2).
 * A day off until 2012, a working day from 2013 to 2016 (ZUJF austerity act),
 * restored as a day off from 2017.
 */
export const isNewYearsSecondDay = defineHoliday(
  "Novo leto",
  (date) =>
    (date.year < 2013 || date.year >= 2017) &&
    date.month === 1 &&
    date.day === 2
);

/**
 * Checks if the date is Prešeren Day, the Slovenian cultural holiday (February 8)
 */
export const isPreserenDay = defineHoliday(
  "Prešernov dan, slovenski kulturni praznik",
  isFixedDate(2, 8)
);

/**
 * Checks if the date is Easter Sunday
 */
export const isEasterSunday = defineHoliday(
  "Velikonočna nedelja",
  isEasterOffset(0)
);

/**
 * Checks if the date is Easter Monday (day after Easter Sunday)
 */
export const isEasterMonday = defineHoliday(
  "Velikonočni ponedeljek",
  isEasterOffset(1)
);

/**
 * Checks if the date is the Day of Uprising Against Occupation (April 27)
 */
export const isResistanceDay = defineHoliday(
  "Dan upora proti okupatorju",
  isFixedDate(4, 27)
);

/**
 * Checks if the date is Labour Day (May 1)
 */
export const isLabourDay = defineHoliday("Praznik dela", isFixedDate(5, 1));

/**
 * Checks if the date is the second day of Labour Day (May 2)
 */
export const isLabourDaySecondDay = defineHoliday(
  "Praznik dela",
  isFixedDate(5, 2)
);

/**
 * Checks if the date is Whit Sunday (49 days after Easter Sunday)
 */
export const isWhitSunday = defineHoliday(
  "Binkoštna nedelja",
  isEasterOffset(49)
);

/**
 * Checks if the date is Statehood Day (June 25)
 */
export const isStatehoodDay = defineHoliday(
  "Dan državnosti",
  isFixedDate(6, 25)
);

/**
 * Checks if the date is Assumption Day (August 15)
 */
export const isAssumptionDay = defineHoliday(
  "Marijino vnebovzetje",
  isFixedDate(8, 15)
);

/**
 * Checks if the date is Reformation Day (October 31)
 */
export const isReformationDay = defineHoliday(
  "Dan reformacije",
  isFixedDate(10, 31)
);

/**
 * Checks if the date is Remembrance Day / All Saints' Day (November 1)
 */
export const isRemembranceDay = defineHoliday(
  "Dan spomina na mrtve",
  isFixedDate(11, 1)
);

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday("Božič", isFixedDate(12, 25));

/**
 * Checks if the date is Independence and Unity Day (December 26)
 */
export const isIndependenceAndUnityDay = defineHoliday(
  "Dan samostojnosti in enotnosti",
  isFixedDate(12, 26)
);

/**
 * Returns all Slovenian nationwide public holiday matchers ("dela prosti dnevi"
 * under the Act on Holidays and Work-Free Days, ZPDPD). Holidays that are not
 * work-free days (e.g. 8 June, 17 August, 15 September, 23 September, 25 October,
 * 23 November) are excluded.
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isNewYearsSecondDay,
  isPreserenDay,
  isEasterSunday,
  isEasterMonday,
  isResistanceDay,
  isLabourDay,
  isLabourDaySecondDay,
  isWhitSunday,
  isStatehoodDay,
  isAssumptionDay,
  isReformationDay,
  isRemembranceDay,
  isChristmasDay,
  isIndependenceAndUnityDay,
];
