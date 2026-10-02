import { defineHoliday, isOrthodoxEasterOffset } from "../utils.js";

/** @typedef {import("luxon").DateTime} DateTime */

/**
 * A predicate that returns true when the given date is a holiday.
 * @callback HolidayMatcher
 * @param {DateTime} date
 * @returns {boolean}
 */

/**
 * Month/day of every fixed-date official holiday of Labour Code art. 154(1).
 * These are the holidays subject to the substitute-day rule of art. 154(2).
 * @type {Array<[number, number]>}
 */
const FIXED_HOLIDAYS = [
  [1, 1],
  [3, 3],
  [5, 1],
  [5, 6],
  [5, 24],
  [9, 6],
  [9, 22],
  [12, 24],
  [12, 25],
  [12, 26],
];

/** Year from which Labour Code art. 154(2) (substitute non-working days) applies. */
const SUBSTITUTE_RULE_FROM = 2017;

const easterMatchers = [-2, -1, 0, 1].map(isOrthodoxEasterOffset);

/** @type {HolidayMatcher} */
const isEasterHoliday = (date) =>
  easterMatchers.some((matcher) => matcher(date));

/**
 * Returns the fixed-date holiday that falls on the given date, if any.
 * @param {DateTime} date
 * @returns {[number, number] | undefined}
 */
const fixedHolidayOn = (date) =>
  FIXED_HOLIDAYS.find(
    ([month, day]) => date.month === month && date.day === day
  );

/**
 * Implements Labour Code art. 154(2): when an official holiday other than the Easter
 * days falls on a Saturday or Sunday, the first (or first two) working days after it
 * are non-working. Returns the fixed-date holiday that the given date substitutes, or
 * undefined when the date is not a substitute day.
 *
 * The non-working days preceding the date are replayed in order, so that consecutive
 * weekend holidays (e.g. December 25-26) are each compensated by a distinct working day.
 *
 * @param {DateTime} date
 * @returns {[number, number] | undefined}
 */
function substitutedHoliday(date) {
  if (date.year < SUBSTITUTE_RULE_FROM) return undefined;
  // Only a working day can be a substitute day
  if (date.weekday > 5 || fixedHolidayOn(date) || isEasterHoliday(date)) {
    return undefined;
  }

  // Replay the previous two weeks: a block of consecutive non-working days is never
  // longer than that, so the replay always starts from a plain working day.
  /** @type {Array<[number, number]>} */
  const pending = [];
  let day = date.minus({ days: 14 });
  for (let i = 0; i < 14; i++, day = day.plus({ days: 1 })) {
    const holiday = fixedHolidayOn(day);
    if (day.weekday > 5) {
      if (holiday) pending.push(holiday);
    } else if (!holiday && !isEasterHoliday(day)) {
      pending.shift();
    }
  }

  return pending.shift();
}

/**
 * Creates a matcher for a fixed-date official holiday that also recognizes the
 * substitute non-working day granted by Labour Code art. 154(2) when the holiday
 * falls on a weekend (from 2017).
 *
 * @param {number} month - Month (1-12)
 * @param {number} day - Day of the month
 * @returns {HolidayMatcher}
 */
const isFixedDateWithSubstitute = (month, day) => (date) => {
  if (date.month === month && date.day === day) return true;
  const substituted = substitutedHoliday(date);
  return (
    substituted !== undefined &&
    substituted[0] === month &&
    substituted[1] === day
  );
};

/**
 * Checks if the date is New Year's Day (January 1), or its substitute working day
 */
export const isNewYearsDay = defineHoliday(
  "Нова година",
  isFixedDateWithSubstitute(1, 1)
);

/**
 * Checks if the date is Liberation Day (March 3), or its substitute working day
 */
export const isLiberationDay = defineHoliday(
  "Ден на Освобождението на България от османско иго",
  isFixedDateWithSubstitute(3, 3)
);

/**
 * Checks if the date is Orthodox Good Friday (2 days before Orthodox Easter Sunday)
 */
export const isGoodFriday = defineHoliday(
  "Велики петък",
  isOrthodoxEasterOffset(-2)
);

/**
 * Checks if the date is Orthodox Holy Saturday (1 day before Orthodox Easter Sunday)
 */
export const isHolySaturday = defineHoliday(
  "Велика събота",
  isOrthodoxEasterOffset(-1)
);

/**
 * Checks if the date is Orthodox Easter Sunday
 */
export const isEasterSunday = defineHoliday(
  "Великден",
  isOrthodoxEasterOffset(0)
);

/**
 * Checks if the date is Orthodox Easter Monday (1 day after Orthodox Easter Sunday)
 */
export const isEasterMonday = defineHoliday(
  "Великден (втори ден)",
  isOrthodoxEasterOffset(1)
);

/**
 * Checks if the date is Labour Day (May 1), or its substitute working day
 */
export const isLabourDay = defineHoliday(
  "Ден на труда и на международната работническа солидарност",
  isFixedDateWithSubstitute(5, 1)
);

/**
 * Checks if the date is Saint George's Day / Army Day (May 6), or its substitute working day
 */
export const isSaintGeorgesDay = defineHoliday(
  "Гергьовден, Ден на храбростта и Българската армия",
  isFixedDateWithSubstitute(5, 6)
);

/**
 * Checks if the date is the Day of Saints Cyril and Methodius, of the Bulgarian alphabet,
 * education and culture (May 24), or its substitute working day
 */
export const isCyrilAndMethodiusDay = defineHoliday(
  "Ден на светите братя Кирил и Методий, на българската азбука, просвета и култура и на славянската книжовност",
  isFixedDateWithSubstitute(5, 24)
);

/**
 * Checks if the date is Unification Day (September 6), or its substitute working day
 */
export const isUnificationDay = defineHoliday(
  "Ден на Съединението",
  isFixedDateWithSubstitute(9, 6)
);

/**
 * Checks if the date is Independence Day (September 22), or its substitute working day
 */
export const isIndependenceDay = defineHoliday(
  "Ден на Независимостта на България",
  isFixedDateWithSubstitute(9, 22)
);

/**
 * Checks if the date is Christmas Eve (December 24), or its substitute working day
 */
export const isChristmasEve = defineHoliday(
  "Бъдни вечер",
  isFixedDateWithSubstitute(12, 24)
);

/**
 * Checks if the date is Christmas Day (December 25), or its substitute working day
 */
export const isChristmasDay = defineHoliday(
  "Рождество Христово",
  isFixedDateWithSubstitute(12, 25)
);

/**
 * Checks if the date is the second day of Christmas (December 26), or its substitute working day
 */
export const isSecondDayOfChristmas = defineHoliday(
  "Рождество Христово (втори ден)",
  isFixedDateWithSubstitute(12, 26)
);

/**
 * Returns all Bulgarian nationwide official holiday matchers (Labour Code art. 154(1)).
 *
 * Fixed-date holidays falling on a weekend are reported twice: on their own date and
 * on the substitute working day granted by art. 154(2) (in force since 2017). Before
 * 2017 substitute days were set by yearly government decision and are not modelled.
 * November 1 (Day of the National Enlighteners) is non-working only for schools and
 * is not included.
 *
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isLiberationDay,
  isGoodFriday,
  isHolySaturday,
  isEasterSunday,
  isEasterMonday,
  isLabourDay,
  isSaintGeorgesDay,
  isCyrilAndMethodiusDay,
  isUnificationDay,
  isIndependenceDay,
  isChristmasEve,
  isChristmasDay,
  isSecondDayOfChristmas,
];
