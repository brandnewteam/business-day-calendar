import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import * as mt from "../../src/holidays/countries/mt.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Maltese Holidays", () => {
  it("should list the 14 public holidays of 2026", () => {
    // Easter Sunday 2026 is on April 5
    expect(listHolidays(mt.getHolidays(), 2026)).toEqual([
      { name: "L-Ewwel tas-Sena", month: 1, day: 1 },
      { name: "Nawfraġju ta' San Pawl", month: 2, day: 10 },
      { name: "San Ġużepp", month: 3, day: 19 },
      { name: "Jum il-Ħelsien", month: 3, day: 31 },
      { name: "Il-Ġimgħa l-Kbira", month: 4, day: 3 },
      { name: "Jum il-Ħaddiem", month: 5, day: 1 },
      { name: "Sette Giugno", month: 6, day: 7 },
      { name: "L-Imnarja", month: 6, day: 29 },
      { name: "Santa Marija", month: 8, day: 15 },
      { name: "Jum il-Vitorja", month: 9, day: 8 },
      { name: "Jum l-Indipendenza", month: 9, day: 21 },
      { name: "Il-Kunċizzjoni", month: 12, day: 8 },
      { name: "Jum ir-Repubblika", month: 12, day: 13 },
      { name: "Il-Milied", month: 12, day: 25 },
    ]);
    expect(mt.getHolidays()).toHaveLength(14);
  });

  it("should compute Good Friday from Easter Sunday", () => {
    // Easter Sunday 2025 is on April 20
    expect(mt.isGoodFriday(DateTime.fromISO("2025-04-18"))).toBe(true);
    expect(mt.isGoodFriday(DateTime.fromISO("2025-04-17"))).toBe(false);
    expect(mt.isGoodFriday(DateTime.fromISO("2027-03-26"))).toBe(true);
  });
});
