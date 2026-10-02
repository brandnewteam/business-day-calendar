import { defineHoliday, isFixedDate, isEasterOffset } from "../utils.js";

/** @typedef {import("luxon").DateTime} DateTime */

/**
 * A predicate that returns true when the given date is a holiday.
 * @callback HolidayMatcher
 * @param {DateTime} date
 * @returns {boolean}
 */

/**
 * Checks if the date is the Day of the Establishment of the Slovak Republic (January 1)
 */
export const isRepublicDay = defineHoliday(
  "Deň vzniku Slovenskej republiky",
  isFixedDate(1, 1)
);

/**
 * Checks if the date is Epiphany (January 6)
 */
export const isEpiphany = defineHoliday("Zjavenie Pána", isFixedDate(1, 6));

/**
 * Checks if the date is Good Friday (2 days before Easter Sunday)
 */
export const isGoodFriday = defineHoliday("Veľký piatok", isEasterOffset(-2));

/**
 * Checks if the date is Easter Monday (day after Easter Sunday)
 */
export const isEasterMonday = defineHoliday(
  "Veľkonočný pondelok",
  isEasterOffset(1)
);

/**
 * Checks if the date is Labour Day (May 1)
 */
export const isLabourDay = defineHoliday("Sviatok práce", isFixedDate(5, 1));

/**
 * Checks if the date is the Day of Victory over Fascism (May 8).
 * Not a day off in 2026 only (Act no. 261/2025 Z. z., § 4b); a day off again from 2027.
 */
export const isVictoryDay = defineHoliday(
  "Deň víťazstva nad fašizmom",
  (date) => date.year !== 2026 && date.month === 5 && date.day === 8
);

/**
 * Checks if the date is Saints Cyril and Methodius Day (July 5)
 */
export const isSaintsCyrilAndMethodiusDay = defineHoliday(
  "Sviatok svätého Cyrila a svätého Metoda",
  isFixedDate(7, 5)
);

/**
 * Checks if the date is the Slovak National Uprising Anniversary (August 29)
 */
export const isNationalUprisingDay = defineHoliday(
  "Výročie Slovenského národného povstania",
  isFixedDate(8, 29)
);

/**
 * Checks if the date is Constitution Day (September 1).
 * Still a state holiday, but no longer a day off from 2025 (2024 consolidation package).
 */
export const isConstitutionDay = defineHoliday(
  "Deň Ústavy Slovenskej republiky",
  (date) => date.year < 2025 && date.month === 9 && date.day === 1
);

/**
 * Checks if the date is Our Lady of Sorrows Day (September 15).
 * Not a day off in 2026 only (Act no. 261/2025 Z. z., § 4b); a day off again from 2027.
 */
export const isOurLadyOfSorrowsDay = defineHoliday(
  "Sedembolestná Panna Mária",
  (date) => date.year !== 2026 && date.month === 9 && date.day === 15
);

/**
 * Checks if the date is All Saints' Day (November 1)
 */
export const isAllSaintsDay = defineHoliday(
  "Sviatok všetkých svätých",
  isFixedDate(11, 1)
);

/**
 * Checks if the date is the Struggle for Freedom and Democracy Day (November 17).
 * Still a state holiday, but no longer a day off from 2025
 * (Act no. 261/2025 Z. z., in force 1 November 2025).
 */
export const isFreedomAndDemocracyDay = defineHoliday(
  "Deň boja za slobodu a demokraciu",
  (date) => date.year < 2025 && date.month === 11 && date.day === 17
);

/**
 * Checks if the date is Christmas Eve (December 24)
 */
export const isChristmasEve = defineHoliday("Štedrý deň", isFixedDate(12, 24));

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday(
  "Prvý sviatok vianočný",
  isFixedDate(12, 25)
);

/**
 * Checks if the date is the second day of Christmas / St. Stephen's Day (December 26)
 */
export const isSecondChristmasDay = defineHoliday(
  "Druhý sviatok vianočný",
  isFixedDate(12, 26)
);

/**
 * Returns all Slovak nationwide public holiday matchers (days of work rest,
 * "dni pracovného pokoja", under Act no. 241/1993 Z. z.)
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isRepublicDay,
  isEpiphany,
  isGoodFriday,
  isEasterMonday,
  isLabourDay,
  isVictoryDay,
  isSaintsCyrilAndMethodiusDay,
  isNationalUprisingDay,
  isConstitutionDay,
  isOurLadyOfSorrowsDay,
  isAllSaintsDay,
  isFreedomAndDemocracyDay,
  isChristmasEve,
  isChristmasDay,
  isSecondChristmasDay,
];
