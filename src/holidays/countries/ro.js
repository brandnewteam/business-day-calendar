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
export const isNewYearsDay = defineHoliday("Anul Nou", isFixedDate(1, 1));

/**
 * Checks if the date is the second day of the New Year (January 2)
 */
export const isDayAfterNewYearsDay = defineHoliday(
  "A doua zi de Anul Nou",
  isFixedDate(1, 2)
);

/**
 * Checks if the date is Epiphany / Baptism of the Lord (January 6).
 * Legal holiday since 2024 (Law 52/2023).
 */
export const isEpiphany = defineHoliday(
  "Boboteaza",
  (date) => date.year >= 2024 && date.month === 1 && date.day === 6
);

/**
 * Checks if the date is the Synaxis of Saint John the Baptist (January 7).
 * Legal holiday since 2024 (Law 52/2023).
 */
export const isSaintJohnTheBaptist = defineHoliday(
  "Soborul Sfântului Proroc Ioan Botezătorul",
  (date) => date.year >= 2024 && date.month === 1 && date.day === 7
);

/**
 * Checks if the date is the Day of the Union of the Romanian Principalities (January 24).
 * Legal holiday since 2017 (Law 176/2016).
 */
export const isUnionDay = defineHoliday(
  "Ziua Unirii Principatelor Române",
  (date) => date.year >= 2017 && date.month === 1 && date.day === 24
);

/**
 * Checks if the date is Orthodox Good Friday (2 days before Orthodox Easter Sunday).
 * Legal holiday since 2018 (Law 64/2018).
 */
export const isGoodFriday = defineHoliday(
  "Vinerea Mare",
  (date) => date.year >= 2018 && isOrthodoxEasterOffset(-2)(date)
);

/**
 * Checks if the date is Orthodox Easter Sunday
 */
export const isEasterSunday = defineHoliday(
  "Paștele",
  isOrthodoxEasterOffset(0)
);

/**
 * Checks if the date is Orthodox Easter Monday (1 day after Orthodox Easter Sunday)
 */
export const isEasterMonday = defineHoliday(
  "A doua zi de Paște",
  isOrthodoxEasterOffset(1)
);

/**
 * Checks if the date is Labour Day (May 1)
 */
export const isLabourDay = defineHoliday("Ziua Muncii", isFixedDate(5, 1));

/**
 * Checks if the date is Children's Day (June 1).
 * Legal holiday since 2017 (Law 220/2016).
 */
export const isChildrensDay = defineHoliday(
  "Ziua Copilului",
  (date) => date.year >= 2017 && date.month === 6 && date.day === 1
);

/**
 * Checks if the date is Orthodox Whit Sunday / Pentecost (49 days after Orthodox Easter Sunday)
 */
export const isWhitSunday = defineHoliday(
  "Rusaliile",
  isOrthodoxEasterOffset(49)
);

/**
 * Checks if the date is Orthodox Whit Monday (50 days after Orthodox Easter Sunday)
 */
export const isWhitMonday = defineHoliday(
  "A doua zi de Rusalii",
  isOrthodoxEasterOffset(50)
);

/**
 * Checks if the date is the Dormition of the Mother of God (August 15).
 * Legal holiday since 2009 (Law 202/2008).
 */
export const isAssumptionDay = defineHoliday(
  "Adormirea Maicii Domnului",
  (date) => date.year >= 2009 && date.month === 8 && date.day === 15
);

/**
 * Checks if the date is Saint Andrew's Day (November 30).
 * Legal holiday since 2012 (Law 147/2012).
 */
export const isSaintAndrewsDay = defineHoliday(
  "Sfântul Andrei",
  (date) => date.year >= 2012 && date.month === 11 && date.day === 30
);

/**
 * Checks if the date is the National Day of Romania (December 1)
 */
export const isNationalDay = defineHoliday(
  "Ziua Națională a României",
  isFixedDate(12, 1)
);

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday("Crăciunul", isFixedDate(12, 25));

/**
 * Checks if the date is the second day of Christmas (December 26)
 */
export const isSecondDayOfChristmas = defineHoliday(
  "A doua zi de Crăciun",
  isFixedDate(12, 26)
);

/**
 * Returns all Romanian nationwide legal holiday matchers (Labour Code art. 139(1)).
 * The two extra days granted to members of non-Christian religions are not modelled.
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isDayAfterNewYearsDay,
  isEpiphany,
  isSaintJohnTheBaptist,
  isUnionDay,
  isGoodFriday,
  isEasterSunday,
  isEasterMonday,
  isLabourDay,
  isChildrensDay,
  isWhitSunday,
  isWhitMonday,
  isAssumptionDay,
  isSaintAndrewsDay,
  isNationalDay,
  isChristmasDay,
  isSecondDayOfChristmas,
];
