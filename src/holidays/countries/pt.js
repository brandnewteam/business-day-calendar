import { defineHoliday, isFixedDate, isEasterOffset } from "../utils.js";

/** @typedef {import("luxon").DateTime} DateTime */

/**
 * A predicate that returns true when the given date is a holiday.
 * @callback HolidayMatcher
 * @param {DateTime} date
 * @returns {boolean}
 */

/*
 * Portuguese public holidays (feriados obrigatórios, Código do Trabalho art. 234),
 * plus the statutory holidays of the autonomous regions of the Azores and Madeira.
 * Carnival Tuesday is only an optional holiday (art. 235) and is not included.
 */

/**
 * Checks if the date is New Year's Day (January 1)
 */
export const isNewYearsDay = defineHoliday("Ano Novo", isFixedDate(1, 1));

/**
 * Checks if the date is Good Friday (Friday before Easter Sunday)
 */
export const isGoodFriday = defineHoliday(
  "Sexta-feira Santa",
  isEasterOffset(-2)
);

/**
 * Checks if the date is Easter Sunday
 */
export const isEasterSunday = defineHoliday(
  "Domingo de Páscoa",
  isEasterOffset(0)
);

/**
 * Checks if the date is Freedom Day (April 25)
 */
export const isFreedomDay = defineHoliday(
  "Dia da Liberdade",
  isFixedDate(4, 25)
);

/**
 * Checks if the date is Labour Day (May 1)
 */
export const isLabourDay = defineHoliday(
  "Dia do Trabalhador",
  isFixedDate(5, 1)
);

/**
 * Checks if the date is Whit Monday (50 days after Easter Sunday). Regional
 * holiday of the Azores ("Dia da Região Autónoma dos Açores").
 */
export const isWhitMonday = defineHoliday(
  "Segunda-feira do Espírito Santo",
  isEasterOffset(50)
);

/**
 * Checks if the date is Corpus Christi (60 days after Easter Sunday)
 */
export const isCorpusChristi = defineHoliday(
  "Corpo de Deus",
  isEasterOffset(60)
);

/**
 * Checks if the date is Portugal Day (June 10)
 */
export const isPortugalDay = defineHoliday(
  "Dia de Portugal",
  isFixedDate(6, 10)
);

/**
 * Checks if the date is Madeira Day (July 1, Madeira only)
 */
export const isMadeiraDay = defineHoliday(
  "Dia da Região Autónoma da Madeira e das Comunidades Madeirenses",
  isFixedDate(7, 1)
);

/**
 * Checks if the date is Assumption Day (August 15)
 */
export const isAssumptionDay = defineHoliday(
  "Assunção de Nossa Senhora",
  isFixedDate(8, 15)
);

/**
 * Checks if the date is Republic Day (October 5)
 */
export const isRepublicDay = defineHoliday(
  "Implantação da República",
  isFixedDate(10, 5)
);

/**
 * Checks if the date is All Saints' Day (November 1)
 */
export const isAllSaintsDay = defineHoliday(
  "Todos os Santos",
  isFixedDate(11, 1)
);

/**
 * Checks if the date is Restoration of Independence Day (December 1)
 */
export const isRestorationOfIndependenceDay = defineHoliday(
  "Restauração da Independência",
  isFixedDate(12, 1)
);

/**
 * Checks if the date is Immaculate Conception (December 8)
 */
export const isImmaculateConception = defineHoliday(
  "Imaculada Conceição",
  isFixedDate(12, 8)
);

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday("Natal", isFixedDate(12, 25));

/**
 * Checks if the date is the First Octave / Boxing Day (December 26, Madeira only)
 */
export const isFirstOctave = defineHoliday(
  "Primeira Oitava",
  isFixedDate(12, 26)
);

/**
 * Returns all Portuguese nationwide public holiday matchers
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isGoodFriday,
  isEasterSunday,
  isFreedomDay,
  isLabourDay,
  isCorpusChristi,
  isPortugalDay,
  isAssumptionDay,
  isRepublicDay,
  isAllSaintsDay,
  isRestorationOfIndependenceDay,
  isImmaculateConception,
  isChristmasDay,
];

/**
 * Returns the public holiday matchers of the autonomous regions (nationwide +
 * regional ones), keyed by ISO 3166-2 code without the "PT-" prefix:
 * "20" (Região Autónoma dos Açores) and "30" (Região Autónoma da Madeira).
 * Mainland districts have no regional holidays.
 * @returns {Record<string, HolidayMatcher[]>}
 */
export const getRegionalHolidays = () => ({
  20: [...getHolidays(), isWhitMonday],
  30: [...getHolidays(), isMadeiraDay, isFirstOctave],
});
