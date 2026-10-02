import { describe, it, expect } from "vitest";
import * as dk from "../../src/holidays/countries/dk.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Danish Holidays", () => {
  it("should list the 2026 nationwide holidays", () => {
    // Easter Sunday 2026 is on April 5
    expect(listHolidays(dk.getHolidays(), 2026)).toEqual([
      { name: "Nytårsdag", month: 1, day: 1 },
      { name: "Skærtorsdag", month: 4, day: 2 },
      { name: "Langfredag", month: 4, day: 3 },
      { name: "Påskedag", month: 4, day: 5 },
      { name: "2. påskedag", month: 4, day: 6 },
      { name: "Kristi himmelfartsdag", month: 5, day: 14 },
      { name: "Pinsedag", month: 5, day: 24 },
      { name: "2. pinsedag", month: 5, day: 25 },
      { name: "Juledag", month: 12, day: 25 },
      { name: "2. juledag", month: 12, day: 26 },
    ]);
  });

  describe("Store bededag (abolished from 2024)", () => {
    it("should be the 4th Friday after Easter in 2023 (May 5)", () => {
      // Easter Sunday 2023 is on April 9
      expect(listHolidays(dk.getHolidays(), 2023)).toContainEqual({
        name: "Store bededag",
        month: 5,
        day: 5,
      });
    });

    it("should not be listed from 2024 onwards", () => {
      const names2024 = listHolidays(dk.getHolidays(), 2024).map((h) => h.name);
      expect(names2024).not.toContain("Store bededag");
      expect(names2024).toHaveLength(10);
    });
  });
});
