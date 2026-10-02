import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import * as fr from "../../src/holidays/countries/fr.js";
import { listHolidays } from "../../src/holidays/index.js";

// Easter Sunday 2026 is on April 5
const NATIONAL_2026 = [
  { name: "Jour de l'an", month: 1, day: 1 },
  { name: "Lundi de Pâques", month: 4, day: 6 },
  { name: "Fête du Travail", month: 5, day: 1 },
  { name: "Victoire 1945", month: 5, day: 8 },
  { name: "Ascension", month: 5, day: 14 },
  { name: "Lundi de Pentecôte", month: 5, day: 25 },
  { name: "Fête nationale", month: 7, day: 14 },
  { name: "Assomption", month: 8, day: 15 },
  { name: "Toussaint", month: 11, day: 1 },
  { name: "Armistice 1918", month: 11, day: 11 },
  { name: "Noël", month: 12, day: 25 },
];

const ALSACE_MOSELLE_2026 = [
  { name: "Jour de l'an", month: 1, day: 1 },
  { name: "Vendredi saint", month: 4, day: 3 },
  { name: "Lundi de Pâques", month: 4, day: 6 },
  { name: "Fête du Travail", month: 5, day: 1 },
  { name: "Victoire 1945", month: 5, day: 8 },
  { name: "Ascension", month: 5, day: 14 },
  { name: "Lundi de Pentecôte", month: 5, day: 25 },
  { name: "Fête nationale", month: 7, day: 14 },
  { name: "Assomption", month: 8, day: 15 },
  { name: "Toussaint", month: 11, day: 1 },
  { name: "Armistice 1918", month: 11, day: 11 },
  { name: "Noël", month: 12, day: 25 },
  { name: "Saint-Étienne", month: 12, day: 26 },
];

describe("French Holidays", () => {
  it("should list the 2026 nationwide holidays", () => {
    expect(listHolidays(fr.getHolidays(), 2026)).toEqual(NATIONAL_2026);
  });

  it("should list the 2026 holidays of Moselle (57)", () => {
    expect(listHolidays(fr.getRegionalHolidays()["57"], 2026)).toEqual(
      ALSACE_MOSELLE_2026
    );
  });

  it("should expose the three Alsace-Moselle departments with the same holidays", () => {
    const regional = fr.getRegionalHolidays();
    expect(Object.keys(regional).sort()).toEqual(["57", "67", "68"]);
    for (const department of Object.keys(regional)) {
      expect(listHolidays(regional[department], 2026)).toEqual(
        ALSACE_MOSELLE_2026
      );
      expect(listHolidays(regional[department], 2026)).toEqual(
        expect.arrayContaining(NATIONAL_2026)
      );
    }
  });

  it("should compute the Easter-based holidays from Easter Sunday", () => {
    // Easter Sunday 2025 is on April 20
    expect(fr.isGoodFriday(DateTime.fromISO("2025-04-18"))).toBe(true);
    expect(fr.isEasterMonday(DateTime.fromISO("2025-04-21"))).toBe(true);
    expect(fr.isAscensionDay(DateTime.fromISO("2025-05-29"))).toBe(true);
    expect(fr.isWhitMonday(DateTime.fromISO("2025-06-09"))).toBe(true);
    expect(fr.isWhitMonday(DateTime.fromISO("2025-06-08"))).toBe(false);
  });
});
