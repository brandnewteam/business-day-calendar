import { defineHoliday, isFixedDate, isEasterOffset } from "../utils.js";

/** @typedef {import("luxon").DateTime} DateTime */

/**
 * A predicate that returns true when the given date is a holiday.
 * @callback HolidayMatcher
 * @param {DateTime} date
 * @returns {boolean}
 */

/*
 * Spanish public holidays (fiestas laborales), as listed every year by the
 * Dirección General de Trabajo in the BOE (Real Decreto 2001/1983, art. 45).
 *
 * Only the stable, statutory rules are modelled here:
 * - the nationwide holidays observed in every autonomous community every year;
 * - Holy Thursday, a substitutable national holiday that every community except
 *   Cataluña and the Comunitat Valenciana keeps every year;
 * - the regional days that each community has by statute (its "Día de la
 *   Comunidad" and other traditional days listed as "Fiesta de Comunidad
 *   Autónoma" in the BOE calendars of 2024, 2025 and 2026).
 *
 * Holidays substituted or moved by the yearly regional decrees (e.g. a holiday
 * falling on a Sunday being observed on the following Monday, or a community
 * picking March 19 / July 25 for a given year) cannot be modelled and are not
 * included: check the BOE calendar of the year for those.
 */

/**
 * Checks if the date is New Year's Day (January 1)
 */
export const isNewYearsDay = defineHoliday("Año Nuevo", isFixedDate(1, 1));

/**
 * Checks if the date is Epiphany (January 6). Substitutable in theory, but kept by
 * every community every year.
 */
export const isEpiphany = defineHoliday(
  "Epifanía del Señor",
  isFixedDate(1, 6)
);

/**
 * Checks if the date is Andalusia Day (February 28, Andalucía only)
 */
export const isAndalusiaDay = defineHoliday(
  "Día de Andalucía",
  isFixedDate(2, 28)
);

/**
 * Checks if the date is Balearic Islands Day (March 1, Illes Balears only)
 */
export const isBalearicIslandsDay = defineHoliday(
  "Día de les Illes Balears",
  isFixedDate(3, 1)
);

/**
 * Checks if the date is Holy Thursday (Thursday before Easter Sunday). National
 * substitutable holiday, observed in every community except Cataluña and the
 * Comunitat Valenciana.
 */
export const isHolyThursday = defineHoliday("Jueves Santo", isEasterOffset(-3));

/**
 * Checks if the date is Good Friday (Friday before Easter Sunday)
 */
export const isGoodFriday = defineHoliday("Viernes Santo", isEasterOffset(-2));

/**
 * Checks if the date is Easter Monday (day after Easter Sunday). Regional holiday
 * in Cataluña, Comunitat Valenciana, Navarra, País Vasco and La Rioja.
 */
export const isEasterMonday = defineHoliday(
  "Lunes de Pascua",
  isEasterOffset(1)
);

/**
 * Checks if the date is Saint George's Day / Aragon Day (April 23, Aragón only)
 */
export const isAragonDay = defineHoliday(
  "San Jorge / Día de Aragón",
  isFixedDate(4, 23)
);

/**
 * Checks if the date is Castile and León Day (April 23, Castilla y León only)
 */
export const isCastileAndLeonDay = defineHoliday(
  "Fiesta de Castilla y León",
  isFixedDate(4, 23)
);

/**
 * Checks if the date is Labour Day (May 1)
 */
export const isLabourDay = defineHoliday(
  "Fiesta del Trabajo",
  isFixedDate(5, 1)
);

/**
 * Checks if the date is Madrid Community Day (May 2, Comunidad de Madrid only)
 */
export const isMadridDay = defineHoliday(
  "Fiesta de la Comunidad de Madrid",
  isFixedDate(5, 2)
);

/**
 * Checks if the date is Galician Literature Day (May 17, Galicia only)
 */
export const isGalicianLiteratureDay = defineHoliday(
  "Día de las Letras Gallegas",
  isFixedDate(5, 17)
);

/**
 * Checks if the date is Canary Islands Day (May 30, Canarias only)
 */
export const isCanaryIslandsDay = defineHoliday(
  "Día de Canarias",
  isFixedDate(5, 30)
);

/**
 * Checks if the date is Castilla-La Mancha Day (May 31, Castilla-La Mancha only)
 */
export const isCastillaLaManchaDay = defineHoliday(
  "Día de Castilla-La Mancha",
  isFixedDate(5, 31)
);

/**
 * Checks if the date is Corpus Christi (60 days after Easter Sunday, Castilla-La
 * Mancha only)
 */
export const isCorpusChristi = defineHoliday(
  "Corpus Christi",
  isEasterOffset(60)
);

/**
 * Checks if the date is Region of Murcia Day (June 9, Región de Murcia only)
 */
export const isMurciaDay = defineHoliday(
  "Día de la Región de Murcia",
  isFixedDate(6, 9)
);

/**
 * Checks if the date is La Rioja Day (June 9, La Rioja only)
 */
export const isLaRiojaDay = defineHoliday("Día de La Rioja", isFixedDate(6, 9));

/**
 * Checks if the date is Saint John's Day (June 24, Cataluña and Comunitat
 * Valenciana only)
 */
export const isSaintJohnsDay = defineHoliday("San Juan", isFixedDate(6, 24));

/**
 * Checks if the date is Galicia National Day / Saint James' Day (July 25, Galicia
 * only)
 */
export const isGaliciaDay = defineHoliday(
  "Día Nacional de Galicia",
  isFixedDate(7, 25)
);

/**
 * Checks if the date is Cantabria Institutions Day (July 28, Cantabria only)
 */
export const isCantabriaInstitutionsDay = defineHoliday(
  "Día de las Instituciones de Cantabria",
  isFixedDate(7, 28)
);

/**
 * Checks if the date is Our Lady of Africa (August 5, Ceuta only)
 */
export const isOurLadyOfAfrica = defineHoliday(
  "Nuestra Señora de África",
  isFixedDate(8, 5)
);

/**
 * Checks if the date is Assumption Day (August 15)
 */
export const isAssumptionDay = defineHoliday(
  "Asunción de la Virgen",
  isFixedDate(8, 15)
);

/**
 * Checks if the date is Ceuta Day (September 2, Ceuta only)
 */
export const isCeutaDay = defineHoliday("Día de Ceuta", isFixedDate(9, 2));

/**
 * Checks if the date is Asturias Day (September 8, Asturias only)
 */
export const isAsturiasDay = defineHoliday(
  "Día de Asturias",
  isFixedDate(9, 8)
);

/**
 * Checks if the date is Extremadura Day (September 8, Extremadura only)
 */
export const isExtremaduraDay = defineHoliday(
  "Día de Extremadura",
  isFixedDate(9, 8)
);

/**
 * Checks if the date is the National Day of Catalonia (September 11, Cataluña only)
 */
export const isCataloniaDay = defineHoliday(
  "Fiesta Nacional de Cataluña",
  isFixedDate(9, 11)
);

/**
 * Checks if the date is Our Lady of La Bien Aparecida (September 15, Cantabria only)
 */
export const isBienAparecida = defineHoliday(
  "La Bien Aparecida",
  isFixedDate(9, 15)
);

/**
 * Checks if the date is Valencian Community Day (October 9, Comunitat Valenciana
 * only)
 */
export const isValencianCommunityDay = defineHoliday(
  "Día de la Comunitat Valenciana",
  isFixedDate(10, 9)
);

/**
 * Checks if the date is the National Day of Spain (October 12)
 */
export const isNationalDay = defineHoliday(
  "Fiesta Nacional de España",
  isFixedDate(10, 12)
);

/**
 * Checks if the date is All Saints' Day (November 1)
 */
export const isAllSaintsDay = defineHoliday(
  "Todos los Santos",
  isFixedDate(11, 1)
);

/**
 * Checks if the date is Constitution Day (December 6)
 */
export const isConstitutionDay = defineHoliday(
  "Día de la Constitución Española",
  isFixedDate(12, 6)
);

/**
 * Checks if the date is Immaculate Conception (December 8)
 */
export const isImmaculateConception = defineHoliday(
  "Inmaculada Concepción",
  isFixedDate(12, 8)
);

/**
 * Checks if the date is Christmas Day (December 25)
 */
export const isChristmasDay = defineHoliday("Navidad", isFixedDate(12, 25));

/**
 * Checks if the date is St. Stephen's Day (December 26, Cataluña only)
 */
export const isStStephensDay = defineHoliday(
  "San Esteban",
  isFixedDate(12, 26)
);

/**
 * Returns the Spanish public holiday matchers that are observed in every autonomous
 * community every year: the nine non-substitutable national holidays plus Epiphany.
 *
 * Holy Thursday (`isHolyThursday`) is a national holiday that communities may
 * substitute; it is observed everywhere except in Cataluña and the Comunitat
 * Valenciana, so it is part of the regional sets instead (see
 * `getRegionalHolidays`). When a national holiday falls on a Sunday the regional
 * decrees usually move it to the following Monday: this is not modelled.
 *
 * @returns {HolidayMatcher[]}
 */
export const getHolidays = () => [
  isNewYearsDay,
  isEpiphany,
  isGoodFriday,
  isLabourDay,
  isAssumptionDay,
  isNationalDay,
  isAllSaintsDay,
  isConstitutionDay,
  isImmaculateConception,
  isChristmasDay,
];

/**
 * Returns the public holiday matchers of each autonomous community and autonomous
 * city (nationwide + regional ones), keyed by ISO 3166-2 code without the "ES-"
 * prefix.
 *
 * Only the stable rules are modelled: Holy Thursday where it is observed every
 * year, and the statutory regional days. The actual calendar of each community is
 * fixed every year by decree and published in the BOE, and may differ from this
 * list: a regional day falling on a weekend is often replaced or moved to a
 * Monday, and communities fill their quota with additional days (March 19,
 * Easter Monday, July 25, December 26, ...) that change from year to year. Ceuta
 * and Melilla also observe Islamic holidays (Eid al-Fitr, Eid al-Adha) whose dates
 * follow the lunar calendar and are not modelled.
 *
 * @returns {Record<string, HolidayMatcher[]>}
 */
export const getRegionalHolidays = () => ({
  AN: [...getHolidays(), isHolyThursday, isAndalusiaDay],
  AR: [...getHolidays(), isHolyThursday, isAragonDay],
  AS: [...getHolidays(), isHolyThursday, isAsturiasDay],
  CB: [
    ...getHolidays(),
    isHolyThursday,
    isCantabriaInstitutionsDay,
    isBienAparecida,
  ],
  CE: [...getHolidays(), isHolyThursday, isOurLadyOfAfrica, isCeutaDay],
  CL: [...getHolidays(), isHolyThursday, isCastileAndLeonDay],
  CM: [
    ...getHolidays(),
    isHolyThursday,
    isCastillaLaManchaDay,
    isCorpusChristi,
  ],
  CN: [...getHolidays(), isHolyThursday, isCanaryIslandsDay],
  CT: [
    ...getHolidays(),
    isEasterMonday,
    isSaintJohnsDay,
    isCataloniaDay,
    isStStephensDay,
  ],
  EX: [...getHolidays(), isHolyThursday, isExtremaduraDay],
  GA: [...getHolidays(), isHolyThursday, isGalicianLiteratureDay, isGaliciaDay],
  IB: [...getHolidays(), isHolyThursday, isBalearicIslandsDay],
  MC: [...getHolidays(), isHolyThursday, isMurciaDay],
  MD: [...getHolidays(), isHolyThursday, isMadridDay],
  ML: [...getHolidays(), isHolyThursday],
  NC: [...getHolidays(), isHolyThursday, isEasterMonday],
  PV: [...getHolidays(), isHolyThursday, isEasterMonday],
  RI: [...getHolidays(), isHolyThursday, isEasterMonday, isLaRiojaDay],
  VC: [
    ...getHolidays(),
    isEasterMonday,
    isSaintJohnsDay,
    isValencianCommunityDay,
  ],
});
