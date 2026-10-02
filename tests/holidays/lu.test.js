import { describe, it, expect } from "vitest";
import * as lu from "../../src/holidays/countries/lu.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Luxembourg Holidays", () => {
  it("should list the 2026 legal holidays", () => {
    expect(listHolidays(lu.getHolidays(), 2026)).toEqual([
      { name: "Nouvel An", month: 1, day: 1 },
      { name: "Lundi de Pâques", month: 4, day: 6 },
      { name: "Fête du Travail", month: 5, day: 1 },
      { name: "Journée de l'Europe", month: 5, day: 9 },
      { name: "Ascension", month: 5, day: 14 },
      { name: "Lundi de Pentecôte", month: 5, day: 25 },
      { name: "Fête nationale", month: 6, day: 23 },
      { name: "Assomption", month: 8, day: 15 },
      { name: "Toussaint", month: 11, day: 1 },
      { name: "Noël", month: 12, day: 25 },
      { name: "Saint-Étienne", month: 12, day: 26 },
    ]);
  });

  it("should include Journée de l'Europe only from 2019", () => {
    const names2018 = listHolidays(lu.getHolidays(), 2018).map((h) => h.name);
    expect(names2018).not.toContain("Journée de l'Europe");
    expect(names2018).toHaveLength(10);

    expect(listHolidays(lu.getHolidays(), 2019)).toContainEqual({
      name: "Journée de l'Europe",
      month: 5,
      day: 9,
    });
  });
});
