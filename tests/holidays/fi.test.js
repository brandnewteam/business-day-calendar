import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import * as fi from "../../src/holidays/countries/fi.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Finnish Holidays", () => {
  it("should list the 2026 nationwide holidays", () => {
    // Easter Sunday 2026 is on April 5
    expect(listHolidays(fi.getHolidays(), 2026)).toEqual([
      { name: "Uudenvuodenpäivä", month: 1, day: 1 },
      { name: "Loppiainen", month: 1, day: 6 },
      { name: "Pitkäperjantai", month: 4, day: 3 },
      { name: "Pääsiäispäivä", month: 4, day: 5 },
      { name: "Toinen pääsiäispäivä", month: 4, day: 6 },
      { name: "Vappu", month: 5, day: 1 },
      { name: "Helatorstai", month: 5, day: 14 },
      { name: "Helluntaipäivä", month: 5, day: 24 },
      { name: "Juhannuspäivä", month: 6, day: 20 },
      { name: "Pyhäinpäivä", month: 10, day: 31 },
      { name: "Itsenäisyyspäivä", month: 12, day: 6 },
      { name: "Joulupäivä", month: 12, day: 25 },
      { name: "Tapaninpäivä", month: 12, day: 26 },
    ]);
  });

  describe("Juhannuspäivä (Saturday between June 20 and 26)", () => {
    it("should fall on June 21 in 2025 and June 26 in 2027", () => {
      expect(fi.isMidsummerDay(DateTime.fromISO("2025-06-21"))).toBe(true);
      expect(fi.isMidsummerDay(DateTime.fromISO("2027-06-26"))).toBe(true);
      expect(fi.isMidsummerDay(DateTime.fromISO("2027-06-19"))).toBe(false);
    });
  });

  describe("Pyhäinpäivä (Saturday between October 31 and November 6)", () => {
    it("should fall on November 1 in 2025 and November 6 in 2027", () => {
      expect(fi.isAllSaintsDay(DateTime.fromISO("2025-11-01"))).toBe(true);
      expect(fi.isAllSaintsDay(DateTime.fromISO("2027-11-06"))).toBe(true);
      expect(fi.isAllSaintsDay(DateTime.fromISO("2027-10-30"))).toBe(false);
    });
  });
});
