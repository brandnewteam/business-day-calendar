import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import * as es from "../../src/holidays/countries/es.js";
import { listHolidays } from "../../src/holidays/index.js";

// Easter Sunday 2026 is on April 5. Sources: BOE-A-2025-21667 (calendario laboral 2026).
// November 1 and December 6 fall on a Sunday in 2026; the Monday substitutions decreed
// by most communities are not modelled, so the statutory dates are expected here.
const NATIONAL_2026 = [
  { name: "Año Nuevo", month: 1, day: 1 },
  { name: "Epifanía del Señor", month: 1, day: 6 },
  { name: "Viernes Santo", month: 4, day: 3 },
  { name: "Fiesta del Trabajo", month: 5, day: 1 },
  { name: "Asunción de la Virgen", month: 8, day: 15 },
  { name: "Fiesta Nacional de España", month: 10, day: 12 },
  { name: "Todos los Santos", month: 11, day: 1 },
  { name: "Día de la Constitución Española", month: 12, day: 6 },
  { name: "Inmaculada Concepción", month: 12, day: 8 },
  { name: "Navidad", month: 12, day: 25 },
];

const REGIONS = [
  "AN",
  "AR",
  "AS",
  "CB",
  "CE",
  "CL",
  "CM",
  "CN",
  "CT",
  "EX",
  "GA",
  "IB",
  "MC",
  "MD",
  "ML",
  "NC",
  "PV",
  "RI",
  "VC",
];

describe("Spanish Holidays", () => {
  it("should list the 2026 nationwide holidays", () => {
    expect(listHolidays(es.getHolidays(), 2026)).toEqual(NATIONAL_2026);
  });

  it("should list the 2026 holidays of Cataluña", () => {
    expect(listHolidays(es.getRegionalHolidays().CT, 2026)).toEqual([
      { name: "Año Nuevo", month: 1, day: 1 },
      { name: "Epifanía del Señor", month: 1, day: 6 },
      { name: "Viernes Santo", month: 4, day: 3 },
      { name: "Lunes de Pascua", month: 4, day: 6 },
      { name: "Fiesta del Trabajo", month: 5, day: 1 },
      { name: "San Juan", month: 6, day: 24 },
      { name: "Asunción de la Virgen", month: 8, day: 15 },
      { name: "Fiesta Nacional de Cataluña", month: 9, day: 11 },
      { name: "Fiesta Nacional de España", month: 10, day: 12 },
      { name: "Todos los Santos", month: 11, day: 1 },
      { name: "Día de la Constitución Española", month: 12, day: 6 },
      { name: "Inmaculada Concepción", month: 12, day: 8 },
      { name: "Navidad", month: 12, day: 25 },
      { name: "San Esteban", month: 12, day: 26 },
    ]);
  });

  it("should list the 2026 holidays of Galicia", () => {
    expect(listHolidays(es.getRegionalHolidays().GA, 2026)).toEqual([
      { name: "Año Nuevo", month: 1, day: 1 },
      { name: "Epifanía del Señor", month: 1, day: 6 },
      { name: "Jueves Santo", month: 4, day: 2 },
      { name: "Viernes Santo", month: 4, day: 3 },
      { name: "Fiesta del Trabajo", month: 5, day: 1 },
      { name: "Día de las Letras Gallegas", month: 5, day: 17 },
      { name: "Día Nacional de Galicia", month: 7, day: 25 },
      { name: "Asunción de la Virgen", month: 8, day: 15 },
      { name: "Fiesta Nacional de España", month: 10, day: 12 },
      { name: "Todos los Santos", month: 11, day: 1 },
      { name: "Día de la Constitución Española", month: 12, day: 6 },
      { name: "Inmaculada Concepción", month: 12, day: 8 },
      { name: "Navidad", month: 12, day: 25 },
    ]);
  });

  it("should list the 2026 holidays of the Comunitat Valenciana", () => {
    expect(listHolidays(es.getRegionalHolidays().VC, 2026)).toEqual([
      { name: "Año Nuevo", month: 1, day: 1 },
      { name: "Epifanía del Señor", month: 1, day: 6 },
      { name: "Viernes Santo", month: 4, day: 3 },
      { name: "Lunes de Pascua", month: 4, day: 6 },
      { name: "Fiesta del Trabajo", month: 5, day: 1 },
      { name: "San Juan", month: 6, day: 24 },
      { name: "Asunción de la Virgen", month: 8, day: 15 },
      { name: "Día de la Comunitat Valenciana", month: 10, day: 9 },
      { name: "Fiesta Nacional de España", month: 10, day: 12 },
      { name: "Todos los Santos", month: 11, day: 1 },
      { name: "Día de la Constitución Española", month: 12, day: 6 },
      { name: "Inmaculada Concepción", month: 12, day: 8 },
      { name: "Navidad", month: 12, day: 25 },
    ]);
  });

  it("should list the 2026 holidays of Castilla-La Mancha", () => {
    expect(listHolidays(es.getRegionalHolidays().CM, 2026)).toEqual([
      { name: "Año Nuevo", month: 1, day: 1 },
      { name: "Epifanía del Señor", month: 1, day: 6 },
      { name: "Jueves Santo", month: 4, day: 2 },
      { name: "Viernes Santo", month: 4, day: 3 },
      { name: "Fiesta del Trabajo", month: 5, day: 1 },
      { name: "Día de Castilla-La Mancha", month: 5, day: 31 },
      { name: "Corpus Christi", month: 6, day: 4 },
      { name: "Asunción de la Virgen", month: 8, day: 15 },
      { name: "Fiesta Nacional de España", month: 10, day: 12 },
      { name: "Todos los Santos", month: 11, day: 1 },
      { name: "Día de la Constitución Española", month: 12, day: 6 },
      { name: "Inmaculada Concepción", month: 12, day: 8 },
      { name: "Navidad", month: 12, day: 25 },
    ]);
  });

  it("should expose every autonomous community and autonomous city", () => {
    expect(Object.keys(es.getRegionalHolidays()).sort()).toEqual(REGIONS);
  });

  it("should include the nationwide holidays in every regional set", () => {
    const regional = es.getRegionalHolidays();
    for (const region of REGIONS) {
      expect(listHolidays(regional[region], 2026)).toEqual(
        expect.arrayContaining(NATIONAL_2026)
      );
    }
  });

  it("should observe Holy Thursday everywhere except in Cataluña and the Comunitat Valenciana", () => {
    const regional = es.getRegionalHolidays();
    for (const region of REGIONS) {
      const hasHolyThursday = regional[region].includes(es.isHolyThursday);
      expect(hasHolyThursday, region).toBe(!["CT", "VC"].includes(region));
    }
  });

  it("should list the 2026 regional extras of each territory", () => {
    const regional = es.getRegionalHolidays();
    const extras = Object.fromEntries(
      REGIONS.map((region) => [
        region,
        listHolidays(regional[region], 2026)
          .filter(
            (h) =>
              !NATIONAL_2026.some(
                (n) => n.name === h.name && n.month === h.month
              )
          )
          .map((h) => `${h.month}-${h.day} ${h.name}`),
      ])
    );
    expect(extras).toEqual({
      AN: ["2-28 Día de Andalucía", "4-2 Jueves Santo"],
      AR: ["4-2 Jueves Santo", "4-23 San Jorge / Día de Aragón"],
      AS: ["4-2 Jueves Santo", "9-8 Día de Asturias"],
      CB: [
        "4-2 Jueves Santo",
        "7-28 Día de las Instituciones de Cantabria",
        "9-15 La Bien Aparecida",
      ],
      CE: [
        "4-2 Jueves Santo",
        "8-5 Nuestra Señora de África",
        "9-2 Día de Ceuta",
      ],
      CL: ["4-2 Jueves Santo", "4-23 Fiesta de Castilla y León"],
      CM: [
        "4-2 Jueves Santo",
        "5-31 Día de Castilla-La Mancha",
        "6-4 Corpus Christi",
      ],
      CN: ["4-2 Jueves Santo", "5-30 Día de Canarias"],
      CT: [
        "4-6 Lunes de Pascua",
        "6-24 San Juan",
        "9-11 Fiesta Nacional de Cataluña",
        "12-26 San Esteban",
      ],
      EX: ["4-2 Jueves Santo", "9-8 Día de Extremadura"],
      GA: [
        "4-2 Jueves Santo",
        "5-17 Día de las Letras Gallegas",
        "7-25 Día Nacional de Galicia",
      ],
      IB: ["3-1 Día de les Illes Balears", "4-2 Jueves Santo"],
      MC: ["4-2 Jueves Santo", "6-9 Día de la Región de Murcia"],
      MD: ["4-2 Jueves Santo", "5-2 Fiesta de la Comunidad de Madrid"],
      ML: ["4-2 Jueves Santo"],
      NC: ["4-2 Jueves Santo", "4-6 Lunes de Pascua"],
      PV: ["4-2 Jueves Santo", "4-6 Lunes de Pascua"],
      RI: ["4-2 Jueves Santo", "4-6 Lunes de Pascua", "6-9 Día de La Rioja"],
      VC: [
        "4-6 Lunes de Pascua",
        "6-24 San Juan",
        "10-9 Día de la Comunitat Valenciana",
      ],
    });
  });

  it("should compute the Easter-based holidays from Easter Sunday", () => {
    // Easter Sunday 2025 is on April 20
    expect(es.isHolyThursday(DateTime.fromISO("2025-04-17"))).toBe(true);
    expect(es.isGoodFriday(DateTime.fromISO("2025-04-18"))).toBe(true);
    expect(es.isEasterMonday(DateTime.fromISO("2025-04-21"))).toBe(true);
    expect(es.isCorpusChristi(DateTime.fromISO("2025-06-19"))).toBe(true);
    expect(es.isHolyThursday(DateTime.fromISO("2025-04-18"))).toBe(false);
  });
});
