import {
  defineHoliday,
  isFixedDate,
  isEasterOffset,
  isNthWeekdayOfMonth,
  isLastWeekdayOfMonth,
} from "../utils.js";

/** @typedef {import("luxon").DateTime} DateTime */

/**
 * A predicate that returns true when the given date is a holiday.
 * @callback HolidayMatcher
 * @param {DateTime} date
 * @returns {boolean}
 */

/*
 * Irish public holidays (Organisation of Working Time Act 1997, Second Schedule,
 * as amended). Good Friday is not a public holiday. When a fixed-date holiday falls
 * on a weekend there is no statutory substitute day, so none is modelled.
 */

/**
 * Checks if the date is New Year's Day (January 1)
 */
export const isNewYearsDay = defineHoliday("New Year's Day", isFixedDate(1, 1));

/**
 * Checks if the date is St Brigid's Day: the first Monday in February, or February 1
 * when it falls on a Friday. Public holiday since 2023 (S.I. No. 525/2022).
 */
export const isStBrigidsDay = defineHoliday("St Brigid's Day", (date) => {
  if (date.year < 2023 || date.month !== 2) return false;
  const february1 = date.set({ day: 1 });
  return february1.weekday === 5
    ? date.day === 1
    : date.weekday === 1 && date.day <= 7;
});

/**
 * Checks if the date is St Patrick's Day (March 17)
 */
export const isStPatricksDay = defineHoliday(
  "St Patrick's Day",
  isFixedDate(3, 17)
);

/**
 * Checks if the date is Easter Monday (day after Easter Sunday)
 */
export const isEasterMonday = defineHoliday("Easter Monday", isEasterOffset(1));

/**
 * Checks if the date is the May Bank Holiday (first Monday in May)
 */
export const isMayBankHoliday = defineHoliday(
  "May Bank Holiday",
  isNthWeekdayOfMonth(5, 1, 1)
);

/**
 * Checks if the date is the June Bank Holiday (first Monday in June)
 */
export const isJuneBankHoliday = defineHoliday(
  "June Bank Holiday",
  isNthWeekdayOfMonth(6, 1, 1)
);

/**
 * Checks if the date is the August Bank Holiday (first Monday in August)
 */
export const isAugustBankHoliday = defineHoliday(
  "August Bank Holiday",
  isNthWeekdayOfMonth(8, 1, 1)
);

/**
 * Checks if the date is the October Bank Holiday (last Monday in October)
 */
export const isOctoberBankHoliday = defineHoliday(
  "October Bank Holiday",
  isLastWeekdayOfMonth(10, 1)
);

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday(
  "Christmas Day",
  isFixedDate(12, 25)
);

/**
 * Checks if the date is St Stephen's Day (December 26)
 */
export const isStStephensDay = defineHoliday(
  "St Stephen's Day",
  isFixedDate(12, 26)
);

/**
 * Returns all Irish public holiday matchers
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isStBrigidsDay,
  isStPatricksDay,
  isEasterMonday,
  isMayBankHoliday,
  isJuneBankHoliday,
  isAugustBankHoliday,
  isOctoberBankHoliday,
  isChristmasDay,
  isStStephensDay,
];
