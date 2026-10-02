import { describe, it, expect } from "vitest";
import * as ee from "../../src/holidays/countries/ee.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Estonian Holidays", () => {
  it("should list the 2026 nationwide holidays", () => {
    // Easter Sunday 2026 is on April 5
    expect(listHolidays(ee.getHolidays(), 2026)).toEqual([
      { name: "Uusaasta", month: 1, day: 1 },
      { name: "Iseseisvuspäev", month: 2, day: 24 },
      { name: "Suur reede", month: 4, day: 3 },
      { name: "Ülestõusmispühade 1. püha", month: 4, day: 5 },
      { name: "Kevadpüha", month: 5, day: 1 },
      { name: "Nelipühade 1. püha", month: 5, day: 24 },
      { name: "Võidupüha", month: 6, day: 23 },
      { name: "Jaanipäev", month: 6, day: 24 },
      { name: "Taasiseseisvumispäev", month: 8, day: 20 },
      { name: "Jõululaupäev", month: 12, day: 24 },
      { name: "Esimene jõulupüha", month: 12, day: 25 },
      { name: "Teine jõulupüha", month: 12, day: 26 },
    ]);
  });

  describe("Jõululaupäev (public holiday since 2005)", () => {
    it("should not be listed in 2004", () => {
      const names2004 = listHolidays(ee.getHolidays(), 2004).map((h) => h.name);
      expect(names2004).not.toContain("Jõululaupäev");
      expect(names2004).toHaveLength(11);
    });

    it("should be listed in 2005", () => {
      expect(listHolidays(ee.getHolidays(), 2005)).toContainEqual({
        name: "Jõululaupäev",
        month: 12,
        day: 24,
      });
    });
  });
});
