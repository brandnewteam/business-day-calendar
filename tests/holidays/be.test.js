import { describe, it, expect } from "vitest";
import * as be from "../../src/holidays/countries/be.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Belgian Holidays", () => {
  it("should list the 2026 legal holidays", () => {
    expect(listHolidays(be.getHolidays(), 2026)).toEqual([
      { name: "Nieuwjaar", month: 1, day: 1 },
      { name: "Paasmaandag", month: 4, day: 6 },
      { name: "Dag van de Arbeid", month: 5, day: 1 },
      { name: "Hemelvaartsdag", month: 5, day: 14 },
      { name: "Pinkstermaandag", month: 5, day: 25 },
      { name: "Nationale feestdag", month: 7, day: 21 },
      { name: "Onze-Lieve-Vrouw-Hemelvaart", month: 8, day: 15 },
      { name: "Allerheiligen", month: 11, day: 1 },
      { name: "Wapenstilstand", month: 11, day: 11 },
      { name: "Kerstmis", month: 12, day: 25 },
    ]);
  });

  it("should always have 10 holidays", () => {
    for (const year of [2020, 2024, 2025, 2027]) {
      expect(listHolidays(be.getHolidays(), year)).toHaveLength(10);
    }
  });
});
