import { describe, it, expect } from "vitest";
import * as at from "../../src/holidays/countries/at.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Austrian Holidays", () => {
  it("should list the 2026 nationwide holidays", () => {
    expect(listHolidays(at.getHolidays(), 2026)).toEqual([
      { name: "Neujahr", month: 1, day: 1 },
      { name: "Heilige Drei Könige", month: 1, day: 6 },
      { name: "Ostermontag", month: 4, day: 6 },
      { name: "Staatsfeiertag", month: 5, day: 1 },
      { name: "Christi Himmelfahrt", month: 5, day: 14 },
      { name: "Pfingstmontag", month: 5, day: 25 },
      { name: "Fronleichnam", month: 6, day: 4 },
      { name: "Mariä Himmelfahrt", month: 8, day: 15 },
      { name: "Nationalfeiertag", month: 10, day: 26 },
      { name: "Allerheiligen", month: 11, day: 1 },
      { name: "Mariä Empfängnis", month: 12, day: 8 },
      { name: "Christtag", month: 12, day: 25 },
      { name: "Stefanitag", month: 12, day: 26 },
    ]);
  });

  it("should not include Good Friday", () => {
    expect(listHolidays(at.getHolidays(), 2026)).not.toContainEqual({
      name: "Karfreitag",
      month: 4,
      day: 3,
    });
  });

  it("should always have 13 holidays", () => {
    for (const year of [2020, 2024, 2025, 2027]) {
      expect(listHolidays(at.getHolidays(), year)).toHaveLength(13);
    }
  });
});
