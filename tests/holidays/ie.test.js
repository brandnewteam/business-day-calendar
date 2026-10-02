import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import * as ie from "../../src/holidays/countries/ie.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Irish Holidays", () => {
  it("should list the 2026 public holidays", () => {
    // Easter Sunday 2026 is on April 5
    expect(listHolidays(ie.getHolidays(), 2026)).toEqual([
      { name: "New Year's Day", month: 1, day: 1 },
      { name: "St Brigid's Day", month: 2, day: 2 },
      { name: "St Patrick's Day", month: 3, day: 17 },
      { name: "Easter Monday", month: 4, day: 6 },
      { name: "May Bank Holiday", month: 5, day: 4 },
      { name: "June Bank Holiday", month: 6, day: 1 },
      { name: "August Bank Holiday", month: 8, day: 3 },
      { name: "October Bank Holiday", month: 10, day: 26 },
      { name: "Christmas Day", month: 12, day: 25 },
      { name: "St Stephen's Day", month: 12, day: 26 },
    ]);
  });

  describe("isStBrigidsDay", () => {
    it("should fall on the first Monday of February", () => {
      // 2023 was the first year: February 1 was a Wednesday, so February 6
      expect(ie.isStBrigidsDay(DateTime.fromISO("2023-02-06"))).toBe(true);
      expect(ie.isStBrigidsDay(DateTime.fromISO("2023-02-01"))).toBe(false);
      // 2027: February 1 is a Monday
      expect(ie.isStBrigidsDay(DateTime.fromISO("2027-02-01"))).toBe(true);
      expect(ie.isStBrigidsDay(DateTime.fromISO("2027-02-08"))).toBe(false);
    });

    it("should fall on February 1 when it is a Friday", () => {
      // 2030: February 1 is a Friday
      expect(ie.isStBrigidsDay(DateTime.fromISO("2030-02-01"))).toBe(true);
      expect(ie.isStBrigidsDay(DateTime.fromISO("2030-02-04"))).toBe(false);
      expect(
        listHolidays(ie.getHolidays(), 2030).filter(
          (h) => h.name === "St Brigid's Day"
        )
      ).toEqual([{ name: "St Brigid's Day", month: 2, day: 1 }]);
    });

    it("should not exist before 2023", () => {
      // 2022: February 7 was the first Monday
      expect(ie.isStBrigidsDay(DateTime.fromISO("2022-02-07"))).toBe(false);
      expect(
        listHolidays(ie.getHolidays(), 2022).map((h) => h.name)
      ).not.toContain("St Brigid's Day");
    });
  });

  it("should compute the Monday bank holidays", () => {
    // 2025: May 5, June 2, August 4, October 27
    expect(ie.isMayBankHoliday(DateTime.fromISO("2025-05-05"))).toBe(true);
    expect(ie.isJuneBankHoliday(DateTime.fromISO("2025-06-02"))).toBe(true);
    expect(ie.isAugustBankHoliday(DateTime.fromISO("2025-08-04"))).toBe(true);
    expect(ie.isOctoberBankHoliday(DateTime.fromISO("2025-10-27"))).toBe(true);
    expect(ie.isOctoberBankHoliday(DateTime.fromISO("2025-10-20"))).toBe(false);
  });

  it("should not move Christmas Day or St Stephen's Day when they fall on a weekend", () => {
    // 2027: December 25 is a Saturday and December 26 a Sunday
    const december = listHolidays(ie.getHolidays(), 2027).filter(
      (h) => h.month === 12
    );
    expect(december).toEqual([
      { name: "Christmas Day", month: 12, day: 25 },
      { name: "St Stephen's Day", month: 12, day: 26 },
    ]);
  });
});
