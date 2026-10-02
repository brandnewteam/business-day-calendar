import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import * as se from "../../src/holidays/countries/se.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Swedish Holidays", () => {
  it("should list the 2026 nationwide holidays", () => {
    // Easter Sunday 2026 is on April 5
    expect(listHolidays(se.getHolidays(), 2026)).toEqual([
      { name: "Nyårsdagen", month: 1, day: 1 },
      { name: "Trettondedag jul", month: 1, day: 6 },
      { name: "Långfredagen", month: 4, day: 3 },
      { name: "Påskdagen", month: 4, day: 5 },
      { name: "Annandag påsk", month: 4, day: 6 },
      { name: "Första maj", month: 5, day: 1 },
      { name: "Kristi himmelsfärdsdag", month: 5, day: 14 },
      { name: "Pingstdagen", month: 5, day: 24 },
      { name: "Sveriges nationaldag", month: 6, day: 6 },
      { name: "Midsommardagen", month: 6, day: 20 },
      { name: "Alla helgons dag", month: 10, day: 31 },
      { name: "Juldagen", month: 12, day: 25 },
      { name: "Annandag jul", month: 12, day: 26 },
    ]);
  });

  describe("Midsommardagen (Saturday between June 20 and 26)", () => {
    it("should fall on June 21 in 2025 and June 26 in 2027", () => {
      expect(se.isMidsummerDay(DateTime.fromISO("2025-06-21"))).toBe(true);
      expect(se.isMidsummerDay(DateTime.fromISO("2027-06-26"))).toBe(true);
      expect(se.isMidsummerDay(DateTime.fromISO("2027-06-19"))).toBe(false);
    });
  });

  describe("Alla helgons dag (Saturday between October 31 and November 6)", () => {
    it("should fall on November 1 in 2025 and November 6 in 2027", () => {
      expect(se.isAllSaintsDay(DateTime.fromISO("2025-11-01"))).toBe(true);
      expect(se.isAllSaintsDay(DateTime.fromISO("2027-11-06"))).toBe(true);
      expect(se.isAllSaintsDay(DateTime.fromISO("2027-10-30"))).toBe(false);
    });
  });

  describe("2005 reform (Nationaldagen replaces Annandag pingst)", () => {
    it("should list Annandag pingst but not Nationaldagen in 2004", () => {
      // Easter Sunday 2004 is on April 11, Whit Monday on May 31
      const holidays2004 = listHolidays(se.getHolidays(), 2004);
      expect(holidays2004).toContainEqual({
        name: "Annandag pingst",
        month: 5,
        day: 31,
      });
      expect(holidays2004.map((h) => h.name)).not.toContain(
        "Sveriges nationaldag"
      );
    });

    it("should list Nationaldagen but not Annandag pingst in 2005", () => {
      const holidays2005 = listHolidays(se.getHolidays(), 2005);
      expect(holidays2005).toContainEqual({
        name: "Sveriges nationaldag",
        month: 6,
        day: 6,
      });
      expect(holidays2005.map((h) => h.name)).not.toContain("Annandag pingst");
    });
  });
});
