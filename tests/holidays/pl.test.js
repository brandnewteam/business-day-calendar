import { describe, it, expect } from "vitest";
import * as pl from "../../src/holidays/countries/pl.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Polish Holidays", () => {
  it("should list the 2026 nationwide holidays", () => {
    expect(listHolidays(pl.getHolidays(), 2026)).toEqual([
      { name: "Nowy Rok", month: 1, day: 1 },
      { name: "Święto Trzech Króli", month: 1, day: 6 },
      { name: "Wielkanoc", month: 4, day: 5 },
      { name: "Poniedziałek Wielkanocny", month: 4, day: 6 },
      { name: "Święto Pracy", month: 5, day: 1 },
      { name: "Święto Narodowe Trzeciego Maja", month: 5, day: 3 },
      { name: "Zielone Świątki", month: 5, day: 24 },
      { name: "Boże Ciało", month: 6, day: 4 },
      { name: "Wniebowzięcie Najświętszej Maryi Panny", month: 8, day: 15 },
      { name: "Wszystkich Świętych", month: 11, day: 1 },
      { name: "Narodowe Święto Niepodległości", month: 11, day: 11 },
      { name: "Wigilia Bożego Narodzenia", month: 12, day: 24 },
      { name: "Boże Narodzenie", month: 12, day: 25 },
      { name: "Drugi dzień Bożego Narodzenia", month: 12, day: 26 },
    ]);
  });

  it("should treat Christmas Eve as a holiday only from 2025", () => {
    const names2024 = listHolidays(pl.getHolidays(), 2024).map((h) => h.name);
    expect(names2024).not.toContain("Wigilia Bożego Narodzenia");
    expect(names2024).toHaveLength(13);

    const names2025 = listHolidays(pl.getHolidays(), 2025).map((h) => h.name);
    expect(names2025).toContain("Wigilia Bożego Narodzenia");
    expect(names2025).toHaveLength(14);
  });
});
