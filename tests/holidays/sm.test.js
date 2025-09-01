import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import * as smHolidays from "../../src/holidays/countries/sm.js";
import {
  calculateEaster,
  calculateEasterMonday,
} from "../../src/holidays/utils.js";

describe("San Marino Holidays", () => {
  describe("isNewYearsDay", () => {
    it("should recognize January 1st as New Year's Day", () => {
      const newYears = DateTime.fromISO("2025-01-01");
      expect(smHolidays.isNewYearsDay(newYears)).toBe(true);
    });

    it("should not recognize non-January 1st dates as New Year's Day", () => {
      const notNewYears = DateTime.fromISO("2025-01-02");
      expect(smHolidays.isNewYearsDay(notNewYears)).toBe(false);
    });
  });

  describe("isEpiphany", () => {
    it("should recognize January 6th as Epiphany", () => {
      const epiphany = DateTime.fromISO("2025-01-06");
      expect(smHolidays.isEpiphany(epiphany)).toBe(true);
    });

    it("should not recognize other days as Epiphany", () => {
      const notEpiphany = DateTime.fromISO("2025-01-07");
      expect(smHolidays.isEpiphany(notEpiphany)).toBe(false);
    });
  });

  describe("isSaintAgathaDay", () => {
    it("should recognize February 5th as Saint Agatha's Day", () => {
      const saintAgathaDay = DateTime.fromISO("2025-02-05");
      expect(smHolidays.isSaintAgathaDay(saintAgathaDay)).toBe(true);
    });

    it("should not recognize other days as Saint Agatha's Day", () => {
      const notSaintAgathaDay = DateTime.fromISO("2025-02-06");
      expect(smHolidays.isSaintAgathaDay(notSaintAgathaDay)).toBe(false);
    });
  });

  describe("isArengoAnniversary", () => {
    it("should recognize March 25th as Arengo Anniversary", () => {
      const arengoAnniversary = DateTime.fromISO("2025-03-25");
      expect(smHolidays.isArengoAnniversary(arengoAnniversary)).toBe(true);
    });

    it("should not recognize other days as Arengo Anniversary", () => {
      const notArengoAnniversary = DateTime.fromISO("2025-03-26");
      expect(smHolidays.isArengoAnniversary(notArengoAnniversary)).toBe(false);
    });
  });

  describe("isChangeOfCaptainRegents", () => {
    it("should recognize April 1st as Change of Captain Regents", () => {
      const changeOfCaptainRegents = DateTime.fromISO("2025-04-01");
      expect(smHolidays.isChangeOfCaptainRegents(changeOfCaptainRegents)).toBe(
        true
      );
    });

    it("should recognize October 1st as Change of Captain Regents", () => {
      const changeOfCaptainRegents = DateTime.fromISO("2025-10-01");
      expect(smHolidays.isChangeOfCaptainRegents(changeOfCaptainRegents)).toBe(
        true
      );
    });

    it("should not recognize other days as Change of Captain Regents", () => {
      const notChangeOfCaptainRegents = DateTime.fromISO("2025-04-02");
      expect(
        smHolidays.isChangeOfCaptainRegents(notChangeOfCaptainRegents)
      ).toBe(false);
    });
  });

  describe("isEasterSunday", () => {
    it("should recognize Easter Sunday correctly", () => {
      // Easter Sunday 2025 is on April 20
      const easterSunday = DateTime.fromISO("2025-04-20");

      // First verify our test assumption is correct
      const easter = calculateEaster(2025);
      expect(easter).toEqual({ year: 2025, month: 4, day: 20 });

      expect(smHolidays.isEasterSunday(easterSunday)).toBe(true);
    });

    it("should not recognize other days as Easter Sunday", () => {
      const notEaster = DateTime.fromISO("2025-04-21"); // Easter Monday
      expect(smHolidays.isEasterSunday(notEaster)).toBe(false);
    });
  });

  describe("isEasterMonday", () => {
    it("should recognize Easter Monday correctly", () => {
      // Easter Monday 2025 is on April 21
      const easterMonday = DateTime.fromISO("2025-04-21");

      // First verify our test assumption is correct
      const monday = calculateEasterMonday(2025);
      expect(monday).toEqual({ year: 2025, month: 4, day: 21 });

      expect(smHolidays.isEasterMonday(easterMonday)).toBe(true);
    });

    it("should not recognize other days as Easter Monday", () => {
      const notEasterMonday = DateTime.fromISO("2025-04-20"); // Easter Sunday
      expect(smHolidays.isEasterMonday(notEasterMonday)).toBe(false);
    });
  });

  describe("isWorkersDay", () => {
    it("should recognize May 1st as Workers' Day", () => {
      const workersDay = DateTime.fromISO("2025-05-01");
      expect(smHolidays.isWorkersDay(workersDay)).toBe(true);
    });

    it("should not recognize other days as Workers' Day", () => {
      const notWorkersDay = DateTime.fromISO("2025-05-02");
      expect(smHolidays.isWorkersDay(notWorkersDay)).toBe(false);
    });
  });

  describe("isCorpusDomini", () => {
    it("should recognize Corpus Domini correctly (60 days after Easter)", () => {
      // Easter 2025 is April 20, so Corpus Domini is June 19
      const corpusDomini = DateTime.fromISO("2025-06-19");
      expect(smHolidays.isCorpusDomini(corpusDomini)).toBe(true);
    });

    it("should not recognize other days as Corpus Domini", () => {
      const notCorpusDomini = DateTime.fromISO("2025-06-20");
      expect(smHolidays.isCorpusDomini(notCorpusDomini)).toBe(false);
    });
  });

  describe("isFreedomDay", () => {
    it("should recognize July 28th as Freedom Day", () => {
      const freedomDay = DateTime.fromISO("2025-07-28");
      expect(smHolidays.isFreedomDay(freedomDay)).toBe(true);
    });

    it("should not recognize other days as Freedom Day", () => {
      const notFreedomDay = DateTime.fromISO("2025-07-29");
      expect(smHolidays.isFreedomDay(notFreedomDay)).toBe(false);
    });
  });

  describe("isAssumptionDay", () => {
    it("should recognize August 15th as Assumption Day", () => {
      const assumptionDay = DateTime.fromISO("2025-08-15");
      expect(smHolidays.isAssumptionDay(assumptionDay)).toBe(true);
    });

    it("should not recognize other days as Assumption Day", () => {
      const notAssumptionDay = DateTime.fromISO("2025-08-16");
      expect(smHolidays.isAssumptionDay(notAssumptionDay)).toBe(false);
    });
  });

  describe("isRepublicDay", () => {
    it("should recognize September 3rd as Republic Day", () => {
      const republicDay = DateTime.fromISO("2025-09-03");
      expect(smHolidays.isRepublicDay(republicDay)).toBe(true);
    });

    it("should not recognize other days as Republic Day", () => {
      const notRepublicDay = DateTime.fromISO("2025-09-04");
      expect(smHolidays.isRepublicDay(notRepublicDay)).toBe(false);
    });
  });

  describe("isAllSaintsDay", () => {
    it("should recognize November 1st as All Saints' Day", () => {
      const allSaintsDay = DateTime.fromISO("2025-11-01");
      expect(smHolidays.isAllSaintsDay(allSaintsDay)).toBe(true);
    });

    it("should not recognize other days as All Saints' Day", () => {
      const notAllSaintsDay = DateTime.fromISO("2025-11-02"); // All Souls' Day
      expect(smHolidays.isAllSaintsDay(notAllSaintsDay)).toBe(false);
    });
  });

  describe("isAllSoulsDay", () => {
    it("should recognize November 2nd as All Souls' Day", () => {
      const allSoulsDay = DateTime.fromISO("2025-11-02");
      expect(smHolidays.isAllSoulsDay(allSoulsDay)).toBe(true);
    });

    it("should not recognize other days as All Souls' Day", () => {
      const notAllSoulsDay = DateTime.fromISO("2025-11-01"); // All Saints' Day
      expect(smHolidays.isAllSoulsDay(notAllSoulsDay)).toBe(false);
    });
  });

  describe("isImmaculateConception", () => {
    it("should recognize December 8th as Immaculate Conception", () => {
      const immaculateConception = DateTime.fromISO("2025-12-08");
      expect(smHolidays.isImmaculateConception(immaculateConception)).toBe(
        true
      );
    });

    it("should not recognize other days as Immaculate Conception", () => {
      const notImmaculateConception = DateTime.fromISO("2025-12-09");
      expect(smHolidays.isImmaculateConception(notImmaculateConception)).toBe(
        false
      );
    });
  });

  describe("isChristmasDay", () => {
    it("should recognize December 25th as Christmas Day", () => {
      const christmasDay = DateTime.fromISO("2025-12-25");
      expect(smHolidays.isChristmasDay(christmasDay)).toBe(true);
    });

    it("should not recognize other days as Christmas Day", () => {
      const notChristmasDay = DateTime.fromISO("2025-12-24");
      expect(smHolidays.isChristmasDay(notChristmasDay)).toBe(false);
    });
  });

  describe("isStStephensDay", () => {
    it("should recognize December 26th as St. Stephen's Day", () => {
      const stStephensDay = DateTime.fromISO("2025-12-26");
      expect(smHolidays.isStStephensDay(stStephensDay)).toBe(true);
    });

    it("should not recognize other days as St. Stephen's Day", () => {
      const notStStephensDay = DateTime.fromISO("2025-12-27");
      expect(smHolidays.isStStephensDay(notStStephensDay)).toBe(false);
    });
  });

  describe("getHolidays", () => {
    it("should return all San Marino holidays", () => {
      const holidays = smHolidays.getHolidays();
      expect(holidays.length).toBe(17); // The holidays in San Marino

      // Verify a few specific holidays are included
      expect(holidays).toContain(smHolidays.isNewYearsDay);
      expect(holidays).toContain(smHolidays.isSaintAgathaDay);
      expect(holidays).toContain(smHolidays.isArengoAnniversary);
      expect(holidays).toContain(smHolidays.isEasterSunday);
      expect(holidays).toContain(smHolidays.isRepublicDay);
      expect(holidays).toContain(smHolidays.isChristmasDay);
    });
  });
});
