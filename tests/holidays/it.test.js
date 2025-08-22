import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import * as itHolidays from "../../src/holidays/countries/it.js";
import {
  calculateEaster,
  calculateEasterMonday,
} from "../../src/holidays/utils.js";

describe("Italian Holidays", () => {
  describe("isNewYearsDay", () => {
    it("should recognize January 1st as New Year's Day", () => {
      const newYears = DateTime.fromISO("2025-01-01");
      expect(itHolidays.isNewYearsDay(newYears)).toBe(true);
    });

    it("should not recognize non-January 1st dates as New Year's Day", () => {
      const notNewYears = DateTime.fromISO("2025-01-06");
      expect(itHolidays.isNewYearsDay(notNewYears)).toBe(false);
    });
  });

  describe("isEpiphany", () => {
    it("should recognize January 6th as Epiphany", () => {
      const epiphany = DateTime.fromISO("2025-01-06");
      expect(itHolidays.isEpiphany(epiphany)).toBe(true);
    });

    it("should not recognize other days as Epiphany", () => {
      const notEpiphany = DateTime.fromISO("2025-01-07");
      expect(itHolidays.isEpiphany(notEpiphany)).toBe(false);
    });
  });

  describe("isEasterSunday", () => {
    it("should recognize Easter Sunday correctly", () => {
      // Easter Sunday 2025 is on April 20
      const easterSunday = DateTime.fromISO("2025-04-20");

      // First verify our test assumption is correct
      const easter = calculateEaster(2025);
      expect(easter).toEqual({ year: 2025, month: 4, day: 20 });

      expect(itHolidays.isEasterSunday(easterSunday)).toBe(true);
    });

    it("should not recognize other days as Easter Sunday", () => {
      const notEaster = DateTime.fromISO("2025-04-21"); // Easter Monday
      expect(itHolidays.isEasterSunday(notEaster)).toBe(false);
    });
  });

  describe("isEasterMonday", () => {
    it("should recognize Easter Monday correctly", () => {
      // Easter Monday 2025 is on April 21
      const easterMonday = DateTime.fromISO("2025-04-21");

      // First verify our test assumption is correct
      const monday = calculateEasterMonday(2025);
      expect(monday).toEqual({ year: 2025, month: 4, day: 21 });

      expect(itHolidays.isEasterMonday(easterMonday)).toBe(true);
    });

    it("should not recognize other days as Easter Monday", () => {
      const notEasterMonday = DateTime.fromISO("2025-04-20"); // Easter Sunday
      expect(itHolidays.isEasterMonday(notEasterMonday)).toBe(false);
    });
  });

  describe("isItalianLiberationDay", () => {
    it("should recognize April 25th as Italian Liberation Day", () => {
      const liberationDay = DateTime.fromISO("2025-04-25");
      expect(itHolidays.isItalianLiberationDay(liberationDay)).toBe(true);
    });

    it("should not recognize other days as Italian Liberation Day", () => {
      expect(
        itHolidays.isItalianLiberationDay(DateTime.fromISO("2025-04-26"))
      ).toBe(false);
      expect(
        itHolidays.isItalianLiberationDay(DateTime.fromISO("2025-06-02"))
      ).toBe(false);
    });
  });

  describe("isWorkersDay", () => {
    it("should recognize May 1st as Workers' Day", () => {
      const workersDay = DateTime.fromISO("2025-05-01");
      expect(itHolidays.isWorkersDay(workersDay)).toBe(true);
    });

    it("should not recognize other days as Workers' Day", () => {
      expect(itHolidays.isWorkersDay(DateTime.fromISO("2025-05-02"))).toBe(
        false
      );
      expect(itHolidays.isWorkersDay(DateTime.fromISO("2025-01-05"))).toBe(
        false
      );
    });
  });

  describe("isItalianRepublicDay", () => {
    it("should recognize June 2nd as Italian Republic Day", () => {
      const republicDay = DateTime.fromISO("2025-06-02");
      expect(itHolidays.isItalianRepublicDay(republicDay)).toBe(true);
    });

    it("should not recognize other days as Italian Republic Day", () => {
      expect(
        itHolidays.isItalianRepublicDay(DateTime.fromISO("2025-06-01"))
      ).toBe(false);
      expect(
        itHolidays.isItalianRepublicDay(DateTime.fromISO("2025-04-25"))
      ).toBe(false);
    });
  });

  describe("isAssumptionDay", () => {
    it("should recognize August 15th as Assumption Day", () => {
      const assumptionDay = DateTime.fromISO("2025-08-15");
      expect(itHolidays.isAssumptionDay(assumptionDay)).toBe(true);
    });

    it("should not recognize other days as Assumption Day", () => {
      expect(itHolidays.isAssumptionDay(DateTime.fromISO("2025-08-14"))).toBe(
        false
      );
      expect(itHolidays.isAssumptionDay(DateTime.fromISO("2025-08-16"))).toBe(
        false
      );
    });
  });

  describe("isAllSaintsDay", () => {
    it("should recognize November 1st as All Saints' Day", () => {
      const allSaintsDay = DateTime.fromISO("2025-11-01");
      expect(itHolidays.isAllSaintsDay(allSaintsDay)).toBe(true);
    });

    it("should not recognize other days as All Saints' Day", () => {
      const notAllSaintsDay = DateTime.fromISO("2025-11-02");
      expect(itHolidays.isAllSaintsDay(notAllSaintsDay)).toBe(false);
    });
  });

  describe("isImmaculateConception", () => {
    it("should recognize December 8th as Immaculate Conception", () => {
      const immaculateConception = DateTime.fromISO("2025-12-08");
      expect(itHolidays.isImmaculateConception(immaculateConception)).toBe(
        true
      );
    });

    it("should not recognize other days as Immaculate Conception", () => {
      expect(
        itHolidays.isImmaculateConception(DateTime.fromISO("2025-12-09"))
      ).toBe(false);
      expect(
        itHolidays.isImmaculateConception(DateTime.fromISO("2025-12-25"))
      ).toBe(false);
    });
  });

  describe("isChristmasDay", () => {
    it("should recognize December 25th as Christmas Day", () => {
      const christmasDay = DateTime.fromISO("2025-12-25");
      expect(itHolidays.isChristmasDay(christmasDay)).toBe(true);
    });

    it("should not recognize other days as Christmas Day", () => {
      expect(itHolidays.isChristmasDay(DateTime.fromISO("2025-12-23"))).toBe(
        false
      );
      expect(itHolidays.isChristmasDay(DateTime.fromISO("2025-12-24"))).toBe(
        false
      );
      expect(itHolidays.isChristmasDay(DateTime.fromISO("2025-12-26"))).toBe(
        false
      );
    });
  });

  describe("isStStephensDay", () => {
    it("should recognize December 26th as St. Stephen's Day", () => {
      const stStephensDay = DateTime.fromISO("2025-12-26");
      expect(itHolidays.isStStephensDay(stStephensDay)).toBe(true);
    });

    it("should not recognize other days as St. Stephen's Day", () => {
      expect(itHolidays.isStStephensDay(DateTime.fromISO("2025-12-27"))).toBe(
        false
      );
      expect(itHolidays.isStStephensDay(DateTime.fromISO("2025-12-31"))).toBe(
        false
      );
    });
  });

  describe("getHolidays", () => {
    it("should return all Italian holidays", () => {
      const holidays = itHolidays.getHolidays();
      expect(holidays.length).toBe(12); // There are 12 Italian holidays

      // Verify a few specific holidays are included
      expect(holidays).toContain(itHolidays.isNewYearsDay);
      expect(holidays).toContain(itHolidays.isEasterSunday);
      expect(holidays).toContain(itHolidays.isChristmasDay);
      expect(holidays).toContain(itHolidays.isStStephensDay);
    });
  });
});
