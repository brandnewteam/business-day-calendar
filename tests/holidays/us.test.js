import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import * as usHolidays from "../../src/holidays/countries/us.js";

describe("US Holidays", () => {
  describe("isNewYearsDay", () => {
    it("should recognize January 1st as New Year's Day", () => {
      const newYears = DateTime.fromISO("2025-01-01");
      expect(usHolidays.isNewYearsDay(newYears)).toBe(true);
    });

    it("should not recognize non-January 1st dates as New Year's Day", () => {
      const notNewYears = DateTime.fromISO("2025-01-02");
      expect(usHolidays.isNewYearsDay(notNewYears)).toBe(false);
    });
  });

  describe("isMlkDay", () => {
    it("should recognize the third Monday in January as MLK Day", () => {
      // In 2025, the third Monday in January is the 20th
      const mlkDay = DateTime.fromISO("2025-01-20");
      expect(usHolidays.isMlkDay(mlkDay)).toBe(true);
    });

    it("should not recognize other Mondays in January as MLK Day", () => {
      // First Monday in January 2025
      const notMlkDay1 = DateTime.fromISO("2025-01-06");
      expect(usHolidays.isMlkDay(notMlkDay1)).toBe(false);

      // Second Monday in January 2025
      const notMlkDay2 = DateTime.fromISO("2025-01-13");
      expect(usHolidays.isMlkDay(notMlkDay2)).toBe(false);

      // Fourth Monday in January 2025
      const notMlkDay3 = DateTime.fromISO("2025-01-27");
      expect(usHolidays.isMlkDay(notMlkDay3)).toBe(false);

      // Third Monday in February 2025
      const notMlkDay4 = DateTime.fromISO("2025-02-17");
      expect(usHolidays.isMlkDay(notMlkDay4)).toBe(false);
    });
  });

  describe("isPresidentsDay", () => {
    it("should recognize the third Monday in February as Presidents' Day", () => {
      // In 2025, the third Monday in February is the 17th
      const presidentsDay = DateTime.fromISO("2025-02-17");
      expect(usHolidays.isPresidentsDay(presidentsDay)).toBe(true);
    });

    it("should not recognize other Mondays in February as Presidents' Day", () => {
      // First Monday in February 2025
      const notPresidentsDay1 = DateTime.fromISO("2025-02-03");
      expect(usHolidays.isPresidentsDay(notPresidentsDay1)).toBe(false);

      // Second Monday in February 2025
      const notPresidentsDay2 = DateTime.fromISO("2025-02-10");
      expect(usHolidays.isPresidentsDay(notPresidentsDay2)).toBe(false);

      // Fourth Monday in February 2025
      const notPresidentsDay3 = DateTime.fromISO("2025-02-24");
      expect(usHolidays.isPresidentsDay(notPresidentsDay3)).toBe(false);

      // Third Monday in March 2025
      const notPresidentsDay4 = DateTime.fromISO("2025-03-17");
      expect(usHolidays.isPresidentsDay(notPresidentsDay4)).toBe(false);
    });
  });

  describe("isMemorialDay", () => {
    it("should recognize the last Monday in May as Memorial Day", () => {
      // In 2025, the last Monday in May is the 26th
      const memorialDay = DateTime.fromISO("2025-05-26");
      expect(usHolidays.isMemorialDay(memorialDay)).toBe(true);
    });

    it("should not recognize other Mondays in May as Memorial Day", () => {
      // First Monday in May 2025
      const notMemorialDay1 = DateTime.fromISO("2025-05-05");
      expect(usHolidays.isMemorialDay(notMemorialDay1)).toBe(false);

      // Second Monday in May 2025
      const notMemorialDay2 = DateTime.fromISO("2025-05-12");
      expect(usHolidays.isMemorialDay(notMemorialDay2)).toBe(false);

      // Third Monday in May 2025
      const notMemorialDay3 = DateTime.fromISO("2025-05-19");
      expect(usHolidays.isMemorialDay(notMemorialDay3)).toBe(false);

      // Last Monday in June 2025
      const notMemorialDay4 = DateTime.fromISO("2025-06-30");
      expect(usHolidays.isMemorialDay(notMemorialDay4)).toBe(false);
    });
  });

  describe("isIndependenceDay", () => {
    it("should recognize July 4th as Independence Day", () => {
      const independenceDay = DateTime.fromISO("2025-07-04");
      expect(usHolidays.isIndependenceDay(independenceDay)).toBe(true);
    });

    it("should not recognize other days in July as Independence Day", () => {
      const notIndependenceDay = DateTime.fromISO("2025-07-03");
      expect(usHolidays.isIndependenceDay(notIndependenceDay)).toBe(false);
    });
  });

  describe("isLaborDay", () => {
    it("should recognize the first Monday in September as Labor Day", () => {
      // In 2025, the first Monday in September is the 1st
      const laborDay = DateTime.fromISO("2025-09-01");
      expect(usHolidays.isLaborDay(laborDay)).toBe(true);
    });

    it("should not recognize other Mondays in September as Labor Day", () => {
      // Second Monday in September 2025
      const notLaborDay2 = DateTime.fromISO("2025-09-08");
      expect(usHolidays.isLaborDay(notLaborDay2)).toBe(false);

      // Third Monday in September 2025
      const notLaborDay3 = DateTime.fromISO("2025-09-15");
      expect(usHolidays.isLaborDay(notLaborDay3)).toBe(false);

      // Forth Monday in September 2025
      const notLaborDay4 = DateTime.fromISO("2025-09-22");
      expect(usHolidays.isLaborDay(notLaborDay4)).toBe(false);

      // Fifth Monday in September 2025
      const notLaborDay5 = DateTime.fromISO("2025-09-29");
      expect(usHolidays.isLaborDay(notLaborDay5)).toBe(false);

      // First Monday in October 2025
      const notLaborDay6 = DateTime.fromISO("2025-10-06");
      expect(usHolidays.isLaborDay(notLaborDay6)).toBe(false);
    });
  });

  describe("isColumbusDay", () => {
    it("should recognize the second Monday in October as Columbus Day", () => {
      // In 2025, the second Monday in October is the 13th
      const columbusDay = DateTime.fromISO("2025-10-13");
      expect(usHolidays.isColumbusDay(columbusDay)).toBe(true);
    });

    it("should not recognize other Mondays in October as Columbus Day", () => {
      // First Monday in October 2025
      const notColumbusDay1 = DateTime.fromISO("2025-10-06");
      expect(usHolidays.isColumbusDay(notColumbusDay1)).toBe(false);

      // Third Monday in October 2025
      const notColumbusDay2 = DateTime.fromISO("2025-10-20");
      expect(usHolidays.isColumbusDay(notColumbusDay2)).toBe(false);

      // Fourth Monday in October 2025
      const notColumbusDay3 = DateTime.fromISO("2025-10-27");
      expect(usHolidays.isColumbusDay(notColumbusDay3)).toBe(false);

      // Second Monday in November 2025
      const notColumbusDay4 = DateTime.fromISO("2025-11-10");
      expect(usHolidays.isColumbusDay(notColumbusDay4)).toBe(false);
    });
  });

  describe("isVeteransDay", () => {
    it("should recognize November 11th as Veterans Day", () => {
      const veteransDay = DateTime.fromISO("2025-11-11");
      expect(usHolidays.isVeteransDay(veteransDay)).toBe(true);
    });

    it("should not recognize other days in November as Veterans Day", () => {
      const notVeteransDay = DateTime.fromISO("2025-11-12");
      expect(usHolidays.isVeteransDay(notVeteransDay)).toBe(false);

      const notVeteransDay2 = DateTime.fromISO("2025-12-11");
      expect(usHolidays.isVeteransDay(notVeteransDay2)).toBe(false);
    });
  });

  describe("isThanksgivingDay", () => {
    it("should recognize the fourth Thursday in November as Thanksgiving Day", () => {
      // In 2025, the fourth Thursday in November is the 27th
      const thanksgivingDay = DateTime.fromISO("2025-11-27");
      expect(usHolidays.isThanksgivingDay(thanksgivingDay)).toBe(true);
    });

    it("should not recognize other Thursdays in November as Thanksgiving Day", () => {
      // First Thursday in November 2025
      const notThanksgiving1 = DateTime.fromISO("2025-11-06");
      expect(usHolidays.isThanksgivingDay(notThanksgiving1)).toBe(false);

      // Second Thursday in November 2025
      const notThanksgiving2 = DateTime.fromISO("2025-11-13");
      expect(usHolidays.isThanksgivingDay(notThanksgiving2)).toBe(false);

      // Third Thursday in November 2025
      const notThanksgiving3 = DateTime.fromISO("2025-11-20");
      expect(usHolidays.isThanksgivingDay(notThanksgiving3)).toBe(false);

      // Fourth Thursday in December 2025
      const notThanksgiving4 = DateTime.fromISO("2025-12-25");
      expect(usHolidays.isThanksgivingDay(notThanksgiving4)).toBe(false);
    });
  });

  describe("isBlackFriday", () => {
    it("should recognize the day after Thanksgiving as Black Friday", () => {
      // In 2025, Black Friday is the 28th of November
      const blackFriday = DateTime.fromISO("2025-11-28");
      expect(usHolidays.isBlackFriday(blackFriday)).toBe(true);
    });

    it("should not recognize other Fridays in November as Black Friday", () => {
      // A different Friday in November 2025
      const notBlackFriday1 = DateTime.fromISO("2025-11-07");
      expect(usHolidays.isBlackFriday(notBlackFriday1)).toBe(false);

      // A different Friday in November 2025
      const notBlackFriday2 = DateTime.fromISO("2025-11-14");
      expect(usHolidays.isBlackFriday(notBlackFriday2)).toBe(false);

      // A different Friday in November 2025
      const notBlackFriday3 = DateTime.fromISO("2025-11-21");
      expect(usHolidays.isBlackFriday(notBlackFriday3)).toBe(false);

      // A Friday in December 2025
      const notBlackFriday4 = DateTime.fromISO("2025-12-26");
      expect(usHolidays.isBlackFriday(notBlackFriday4)).toBe(false);
    });
  });

  describe("isChristmasDay", () => {
    it("should recognize December 25th as Christmas Day", () => {
      const christmasDay = DateTime.fromISO("2025-12-25");
      expect(usHolidays.isChristmasDay(christmasDay)).toBe(true);
    });

    it("should not recognize other days in December as Christmas Day", () => {
      const notChristmasDay = DateTime.fromISO("2025-12-24");
      expect(usHolidays.isChristmasDay(notChristmasDay)).toBe(false);
    });
  });

  describe("isChristmasEve", () => {
    it("should recognize December 24th as Christmas Eve", () => {
      const christmasEve = DateTime.fromISO("2025-12-24");
      expect(usHolidays.isChristmasEve(christmasEve)).toBe(true);
    });

    it("should not recognize other days in December as Christmas Eve", () => {
      const notChristmasEve = DateTime.fromISO("2025-12-23");
      expect(usHolidays.isChristmasEve(notChristmasEve)).toBe(false);
    });
  });

  describe("isNewYearsEve", () => {
    it("should recognize December 31st as New Year's Eve", () => {
      const newYearsEve = DateTime.fromISO("2025-12-31");
      expect(usHolidays.isNewYearsEve(newYearsEve)).toBe(true);
    });

    it("should not recognize other days in December as New Year's Eve", () => {
      const notNewYearsEve = DateTime.fromISO("2025-12-30");
      expect(usHolidays.isNewYearsEve(notNewYearsEve)).toBe(false);
    });
  });

  describe("isJuneteenth", () => {
    it("should recognize June 19th as Juneteenth", () => {
      const juneteenth = DateTime.fromISO("2025-06-19");
      expect(usHolidays.isJuneteenth(juneteenth)).toBe(true);
    });

    it("should not recognize other days in June as Juneteenth", () => {
      const notJuneteenth = DateTime.fromISO("2025-06-20");
      expect(usHolidays.isJuneteenth(notJuneteenth)).toBe(false);
    });
  });

  describe("getHolidays", () => {
    it("should return all US holidays when onlyFederal is false", () => {
      const allHolidays = usHolidays.getHolidays();
      const allHolidaysExplicit = usHolidays.getHolidays(false);
      // Federal holidays + 3 additional holidays (Christmas Eve, New Year's Eve, Black Friday)
      expect(allHolidays.length).toBe(14);
      expect(allHolidays.length).toBe(allHolidaysExplicit.length);
    });

    it("should return only federal holidays when onlyFederal is true", () => {
      const federalHolidays = usHolidays.getHolidays(true);
      // Only the 11 federal holidays
      expect(federalHolidays.length).toBe(11);
    });

    it("should include non-federal holidays when onlyFederal is false", () => {
      const allHolidays = usHolidays.getHolidays(false);

      // Check if the non-federal holidays are included
      const hasChristmasEve = allHolidays.includes(usHolidays.isChristmasEve);
      const hasNewYearsEve = allHolidays.includes(usHolidays.isNewYearsEve);
      const hasBlackFriday = allHolidays.includes(usHolidays.isBlackFriday);

      expect(hasChristmasEve).toBe(true);
      expect(hasNewYearsEve).toBe(true);
      expect(hasBlackFriday).toBe(true);
    });

    it("should not include non-federal holidays when onlyFederal is true", () => {
      const federalHolidays = usHolidays.getHolidays(true);

      // Check if the non-federal holidays are not included
      const hasChristmasEve = federalHolidays.includes(
        usHolidays.isChristmasEve
      );
      const hasNewYearsEve = federalHolidays.includes(usHolidays.isNewYearsEve);
      const hasBlackFriday = federalHolidays.includes(usHolidays.isBlackFriday);

      expect(hasChristmasEve).toBe(false);
      expect(hasNewYearsEve).toBe(false);
      expect(hasBlackFriday).toBe(false);
    });
  });
});
