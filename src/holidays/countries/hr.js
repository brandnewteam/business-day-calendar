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
export const isNewYearsDay = defineHoliday("Nova godina", isFixedDate(1, 1));

/**
 * Checks if the date is Epiphany (January 6)
 */
export const isEpiphany = defineHoliday(
  "Bogojavljenje ili Sveta tri kralja",
  isFixedDate(1, 6)
);

/**
 * Checks if the date is Easter Sunday
 */
export const isEasterSunday = defineHoliday("Uskrs", isEasterOffset(0));

/**
 * Checks if the date is Easter Monday (day after Easter Sunday)
 */
export const isEasterMonday = defineHoliday(
  "Uskrsni ponedjeljak",
  isEasterOffset(1)
);

/**
 * Checks if the date is Labour Day (May 1)
 */
export const isLabourDay = defineHoliday("Praznik rada", isFixedDate(5, 1));

/**
 * Checks if the date is Statehood Day (May 30). Moved to this date from 2020
 * (Act on Holidays, Memorial Days and Non-Working Days, NN 110/2019).
 */
export const isStatehoodDay = defineHoliday(
  "Dan državnosti",
  (date) => date.year >= 2020 && date.month === 5 && date.day === 30
);

/**
 * Checks if the date is Corpus Christi (60 days after Easter Sunday)
 */
export const isCorpusChristi = defineHoliday("Tijelovo", isEasterOffset(60));

/**
 * Checks if the date is Anti-Fascist Struggle Day (June 22)
 */
export const isAntiFascistStruggleDay = defineHoliday(
  "Dan antifašističke borbe",
  isFixedDate(6, 22)
);

/**
 * Checks if the date is Victory and Homeland Thanksgiving Day and the Day of
 * Croatian Defenders (August 5)
 */
export const isVictoryDay = defineHoliday(
  "Dan pobjede i domovinske zahvalnosti i Dan hrvatskih branitelja",
  isFixedDate(8, 5)
);

/**
 * Checks if the date is Assumption Day (August 15)
 */
export const isAssumptionDay = defineHoliday(
  "Velika Gospa",
  isFixedDate(8, 15)
);

/**
 * Checks if the date is All Saints' Day (November 1)
 */
export const isAllSaintsDay = defineHoliday("Svi sveti", isFixedDate(11, 1));

/**
 * Checks if the date is Remembrance Day for the victims of the Homeland War and
 * of Vukovar and Škabrnja (November 18). A non-working day from 2020 (NN 110/2019).
 */
export const isRemembranceDay = defineHoliday(
  "Dan sjećanja na žrtve Domovinskog rata i Dan sjećanja na žrtvu Vukovara i Škabrnje",
  (date) => date.year >= 2020 && date.month === 11 && date.day === 18
);

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday("Božić", isFixedDate(12, 25));

/**
 * Checks if the date is St. Stephen's Day (December 26)
 */
export const isStStephensDay = defineHoliday(
  "Sveti Stjepan",
  isFixedDate(12, 26)
);

/**
 * Returns all Croatian nationwide public holiday matchers ("blagdani i neradni dani"
 * under the Act on Holidays, Memorial Days and Non-Working Days, NN 110/2019, 72/2025)
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isEpiphany,
  isEasterSunday,
  isEasterMonday,
  isLabourDay,
  isStatehoodDay,
  isCorpusChristi,
  isAntiFascistStruggleDay,
  isVictoryDay,
  isAssumptionDay,
  isAllSaintsDay,
  isRemembranceDay,
  isChristmasDay,
  isStStephensDay,
];
