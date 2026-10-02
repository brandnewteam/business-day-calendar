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
export const isNewYearsDay = defineHoliday("Neujahr", isFixedDate(1, 1));

/**
 * Checks if the date is Epiphany (January 6). Regional: BW, BY, ST.
 */
export const isEpiphany = defineHoliday(
  "Heilige Drei Könige",
  isFixedDate(1, 6)
);

/**
 * Checks if the date is International Women's Day (March 8) as a Berlin public holiday,
 * introduced in 2019.
 */
export const isWomensDayBE = defineHoliday(
  "Internationaler Frauentag",
  (date) => date.year >= 2019 && date.month === 3 && date.day === 8
);

/**
 * Checks if the date is International Women's Day (March 8) as a Mecklenburg-Vorpommern
 * public holiday, introduced in 2023.
 */
export const isWomensDayMV = defineHoliday(
  "Internationaler Frauentag",
  (date) => date.year >= 2023 && date.month === 3 && date.day === 8
);

/**
 * Checks if the date is Good Friday (Friday before Easter Sunday)
 */
export const isGoodFriday = defineHoliday("Karfreitag", isEasterOffset(-2));

/**
 * Checks if the date is Easter Sunday. Regional: BB (the only Land that lists it as a
 * statutory holiday; Hessen only declares all Sundays holidays in general).
 */
export const isEasterSunday = defineHoliday("Ostersonntag", isEasterOffset(0));

/**
 * Checks if the date is Easter Monday (day after Easter Sunday)
 */
export const isEasterMonday = defineHoliday("Ostermontag", isEasterOffset(1));

/**
 * Checks if the date is Labour Day (May 1)
 */
export const isLabourDay = defineHoliday("Tag der Arbeit", isFixedDate(5, 1));

/**
 * Checks if the date is Ascension Day (39 days after Easter Sunday)
 */
export const isAscensionDay = defineHoliday(
  "Christi Himmelfahrt",
  isEasterOffset(39)
);

/**
 * Checks if the date is Whit Sunday (49 days after Easter Sunday). Regional: BB.
 */
export const isWhitSunday = defineHoliday("Pfingstsonntag", isEasterOffset(49));

/**
 * Checks if the date is Whit Monday (50 days after Easter Sunday)
 */
export const isWhitMonday = defineHoliday("Pfingstmontag", isEasterOffset(50));

/**
 * Checks if the date is Corpus Christi (60 days after Easter Sunday).
 * Regional: BW, BY, HE, NW, RP, SL (in SN and TH only in a few municipalities, not modelled).
 */
export const isCorpusChristi = defineHoliday(
  "Fronleichnam",
  isEasterOffset(60)
);

/**
 * Checks if the date is Assumption Day (August 15). Regional: BY, SL.
 * In Bayern it is a statutory holiday only in municipalities with a predominantly Catholic
 * population (Art. 1 Abs. 1 Nr. 2 BayFTG, about 1,700 of 2,056 municipalities, including
 * München and Augsburg but not e.g. Nürnberg); it is included in the BY set as the common case.
 */
export const isAssumptionDay = defineHoliday(
  "Mariä Himmelfahrt",
  isFixedDate(8, 15)
);

/**
 * Checks if the date is World Children's Day (September 20). Regional: TH, since 2019.
 */
export const isWorldChildrensDay = defineHoliday(
  "Weltkindertag",
  (date) => date.year >= 2019 && date.month === 9 && date.day === 20
);

/**
 * Checks if the date is German Unity Day (October 3)
 */
export const isGermanUnityDay = defineHoliday(
  "Tag der Deutschen Einheit",
  isFixedDate(10, 3)
);

/**
 * Checks if the date is Reformation Day (October 31). Regional: BB, MV, SN, ST, TH.
 * (It was a one-off nationwide holiday in 2017 for the 500th anniversary; not modelled.)
 */
export const isReformationDay = defineHoliday(
  "Reformationstag",
  isFixedDate(10, 31)
);

/**
 * Checks if the date is Reformation Day (October 31) in the northern Länder HB, HH, NI, SH,
 * where it is a public holiday since 2018.
 */
export const isReformationDayNorth = defineHoliday(
  "Reformationstag",
  (date) => date.year >= 2018 && date.month === 10 && date.day === 31
);

/**
 * Checks if the date is All Saints' Day (November 1). Regional: BW, BY, NW, RP, SL.
 */
export const isAllSaintsDay = defineHoliday(
  "Allerheiligen",
  isFixedDate(11, 1)
);

/**
 * Checks if the date is Repentance and Prayer Day (the Wednesday before November 23,
 * i.e. the Wednesday between November 16 and 22). Regional: SN.
 */
export const isRepentanceDay = defineHoliday(
  "Buß- und Bettag",
  (date) =>
    date.month === 11 && date.weekday === 3 && date.day >= 16 && date.day <= 22
);

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday(
  "Erster Weihnachtstag",
  isFixedDate(12, 25)
);

/**
 * Checks if the date is St. Stephen's Day / Second Day of Christmas (December 26)
 */
export const isStStephensDay = defineHoliday(
  "Zweiter Weihnachtstag",
  isFixedDate(12, 26)
);

/**
 * Returns all German nationwide public holiday matchers
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isGoodFriday,
  isEasterMonday,
  isLabourDay,
  isAscensionDay,
  isWhitMonday,
  isGermanUnityDay,
  isChristmasDay,
  isStStephensDay,
];

/**
 * Returns the public holiday matchers of each Land (nationwide + regional ones),
 * keyed by ISO 3166-2 code without the "DE-" prefix.
 *
 * Not modelled: the municipality-level exceptions to Mariä Himmelfahrt in BY,
 * Fronleichnam in some SN/TH municipalities, the Augsburg Friedensfest (August 8),
 * and the one-off nationwide Reformationstag of 2017.
 * @returns {Record<string, HolidayMatcher[]>}
 */
export const getRegionalHolidays = () => ({
  BW: [...getHolidays(), isEpiphany, isCorpusChristi, isAllSaintsDay],
  BY: [
    ...getHolidays(),
    isEpiphany,
    isCorpusChristi,
    isAssumptionDay,
    isAllSaintsDay,
  ],
  BE: [...getHolidays(), isWomensDayBE],
  BB: [...getHolidays(), isEasterSunday, isWhitSunday, isReformationDay],
  HB: [...getHolidays(), isReformationDayNorth],
  HH: [...getHolidays(), isReformationDayNorth],
  HE: [...getHolidays(), isCorpusChristi],
  MV: [...getHolidays(), isWomensDayMV, isReformationDay],
  NI: [...getHolidays(), isReformationDayNorth],
  NW: [...getHolidays(), isCorpusChristi, isAllSaintsDay],
  RP: [...getHolidays(), isCorpusChristi, isAllSaintsDay],
  SL: [...getHolidays(), isCorpusChristi, isAssumptionDay, isAllSaintsDay],
  SN: [...getHolidays(), isReformationDay, isRepentanceDay],
  ST: [...getHolidays(), isEpiphany, isReformationDay],
  SH: [...getHolidays(), isReformationDayNorth],
  TH: [...getHolidays(), isWorldChildrensDay, isReformationDay],
});
