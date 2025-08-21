import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import { create, BusinessDayCalendar } from "../src/index.js";

describe("BusinessDayCalendar", () => {
  // Test creation of calendar
  describe("creation", () => {
    it("should create a calendar with default options", () => {
      const now = DateTime.now();
      const calendar1 = create();

      expect(calendar1).toBeInstanceOf(BusinessDayCalendar);
      expect(calendar1.isValid).toBe(true);
      expect(calendar1.toISODate()).toBe(now.toISODate());
    });

    it("should create a calendar by passing a DateTime", () => {
      const monday = DateTime.fromISO("2024-01-01");
      const calendar1 = create(monday);

      expect(calendar1).toBeInstanceOf(BusinessDayCalendar);
      expect(calendar1.isValid).toBe(true);
      expect(calendar1.toISO()).toBe(monday.toISO());
    });

    it("should create a calendar with custom weekends day", () => {
      const options = {
        weekendDays: [5, 6], // Only Friday and Saturday are weekend days
      };

      const monday = create(DateTime.fromISO("2024-01-01"), options);
      const tuesday = create(DateTime.fromISO("2024-01-02"), options);
      const wednesday = create(DateTime.fromISO("2024-01-03"), options);
      const thursday = create(DateTime.fromISO("2024-01-04"), options);
      const friday = create(DateTime.fromISO("2024-01-05"), options);
      const saturday = create(DateTime.fromISO("2024-01-06"), options);
      const sunday = create(DateTime.fromISO("2024-01-07"), options);

      expect(monday.isBusinessDay()).toBe(true);
      expect(tuesday.isBusinessDay()).toBe(true);
      expect(wednesday.isBusinessDay()).toBe(true);
      expect(thursday.isBusinessDay()).toBe(true);
      expect(friday.isBusinessDay()).toBe(false);
      expect(saturday.isBusinessDay()).toBe(false);
      expect(sunday.isBusinessDay()).toBe(true);
    });

    it("should create a calendar with holiday matchers", () => {
      const isNewYearsDay = (date) => date.month === 1 && date.day === 1;

      const calendar = create(
        DateTime.fromISO("2024-01-01"), // A holiday on Monday
        {
          holidayMatchers: [isNewYearsDay],
        }
      );

      expect(calendar.isHoliday()).toBe(true);
      expect(calendar.isBusinessDay()).toBe(false);
    });

    // Test common object methods
    it("should implement valueOf correctly", () => {
      const monday = DateTime.fromISO("2024-01-01");
      const businessMonday = create(monday);
      expect(businessMonday.valueOf()).toBe(monday.valueOf());

      // Test comparison works
      const tuesday = DateTime.fromISO("2024-01-02");
      const businessTuesday = create(tuesday);
      expect(businessTuesday > businessMonday).toBe(true);
    });

    it("should implement toString correctly", () => {
      const monday = DateTime.fromISO("2024-01-01", { zone: "utc" });
      const businessMonday = create(monday);
      expect(businessMonday.toString()).toBe(monday.toString());
      expect(businessMonday.toString()).toBe("2024-01-01T00:00:00.000Z");
    });

    it("should implement toLocaleString correctly", () => {
      const monday = DateTime.fromISO("2024-01-01", { zone: "utc" });
      const businessMonday = create(monday);
      expect(businessMonday.toLocaleString()).toBe(monday.toLocaleString());
    });

    it("should handle empty weekendDays array", () => {
      const calendar = create(DateTime.fromISO("2024-01-01"), {
        weekendDays: [],
      });

      expect(calendar.isBusinessDay()).toBe(true);

      // Test adding business days with no weekend days
      expect(calendar.plusBusiness(5).toISODate()).toBe("2024-01-06");
      expect(calendar.plusBusiness(14).toISODate()).toBe("2024-01-15");
    });

    // Test large number of business days
    it("should handle adding a large number of business days", () => {
      const isChristmas = (date) => date.month === 12 && date.day === 25;
      const isBoxingDay = (date) => date.month === 12 && date.day === 26;
      const isNewYears = (date) => date.month === 1 && date.day === 1;

      const start = create(DateTime.fromISO("2024-01-01"), {
        holidayMatchers: [isChristmas, isBoxingDay, isNewYears],
      });
      const result = start.plusBusiness(10_000);

      // Calculate the expected date (this would be ~14.000+ calendar days ahead)
      expect(result.isBusinessDay()).toBe(true);
    });

    // Test handling of fractional business days
    it("should ceil fractional business day values", () => {
      const start = create(DateTime.fromISO("2024-01-01")); // Monday
      const result1 = start.plusBusiness(1.7);
      const result2 = start.plusBusiness(1.2);

      expect(result1.toISODate()).toBe("2024-01-03"); // Should be same as adding 1
      expect(result2.toISODate()).toBe("2024-01-03"); // Should be same as adding 1
    });
  });

  // Test isBusinessDay method
  describe("isBusinessDay", () => {
    it("should return true for business days", () => {
      const mon = create(DateTime.fromISO("2024-01-01"));
      const tue = create(DateTime.fromISO("2024-01-02"));
      const wed = create(DateTime.fromISO("2024-01-03"));
      const thu = create(DateTime.fromISO("2024-01-04"));
      const fri = create(DateTime.fromISO("2024-01-05"));

      expect(mon.isBusinessDay()).toBe(true);
      expect(tue.isBusinessDay()).toBe(true);
      expect(wed.isBusinessDay()).toBe(true);
      expect(thu.isBusinessDay()).toBe(true);
      expect(fri.isBusinessDay()).toBe(true);
    });

    it("should return false for weekends", () => {
      const sat = create(DateTime.fromISO("2024-01-27"));
      const sun = create(DateTime.fromISO("2024-01-28"));

      expect(sat.isBusinessDay()).toBe(false);
      expect(sun.isBusinessDay()).toBe(false);
    });

    it("should return false for holidays on weekdays", () => {
      const isWorkersDay = (date) => date.month === 5 && date.day === 1;

      const wed = create(DateTime.fromISO("2024-05-01"), {
        holidayMatchers: [isWorkersDay],
      });

      expect(wed.isBusinessDay()).toBe(false);
    });
  });

  // Test isHoliday method
  describe("isHoliday", () => {
    it("should return true for dates matching holiday matchers", () => {
      const isChristmas = (date) => date.month === 12 && date.day === 25;

      const wed = create(
        DateTime.fromISO("2024-12-25"), // Christmas on a Wednesday
        {
          holidayMatchers: [isChristmas],
        }
      );

      expect(wed.isHoliday()).toBe(true);
    });

    it("should return false for dates not matching holiday matchers", () => {
      const isChristmas = (date) => date.month === 12 && date.day === 25;
      const wed = create(
        DateTime.fromISO("2024-12-18"), // A week before Christmas
        {
          holidayMatchers: [isChristmas],
        }
      );

      expect(wed.isHoliday()).toBe(false);
    });

    it("should work with multiple holiday matchers", () => {
      const isChristmas = (date) => date.month === 12 && date.day === 25;
      const isNewYears = (date) => date.month === 1 && date.day === 1;

      const jan1 = create(DateTime.fromISO("2024-01-01"), {
        holidayMatchers: [isChristmas, isNewYears],
      });
      const blueMonday = create(DateTime.fromISO("2024-01-15"), {
        holidayMatchers: [isChristmas, isNewYears],
      });
      const christmas = create(DateTime.fromISO("2024-12-25"), {
        holidayMatchers: [isChristmas, isNewYears],
      });

      expect(jan1.isHoliday()).toBe(true);
      expect(blueMonday.isHoliday()).toBe(false);
      expect(christmas.isHoliday()).toBe(true);
    });
  });

  // Test diffBusinessDays method
  describe("diffBusinessDays", () => {
    it("should work with either another BusinessDayCalendar or a plain DateTime", () => {
      const isWorkersDay = (date) => date.month === 5 && date.day === 1;
      const start = create(
        DateTime.fromISO("2024-04-30"), // Wed
        {
          holidayMatchers: [isWorkersDay],
        }
      );

      const endCal = create(DateTime.fromISO("2024-05-05")); // Sunday
      const endDateTime = DateTime.fromISO("2024-05-05"); // Sunday

      const diffCal = start.diffBusinessDays(endCal);
      const diffDateTime = start.diffBusinessDays(endDateTime);

      expect(diffCal.as("days")).toBe(3); // 3 business days (Mon, Thu, Fri)
      expect(diffDateTime.as("days")).toBe(3); // 3 business days (Mon, Thu, Fri)
    });

    it("should count business days between two dates", () => {
      const mon = create(DateTime.fromISO("2024-01-08")); // Monday
      const nextFri = DateTime.fromISO("2024-01-12"); // Next Monday
      const nextMon = DateTime.fromISO("2024-01-15"); // Next Monday

      const diffFri = mon.diffBusinessDays(nextFri);
      const diffMon = mon.diffBusinessDays(nextMon);

      expect(diffFri.as("days")).toBe(4); // 4 business days (Mon, Tue, Wed, Thu)
      expect(diffMon.as("days")).toBe(5); // 5 business days (Mon, Tue, Wed, Thu, Fri)
    });

    it("should handle backwards date differences", () => {
      const start = create(DateTime.fromISO("2024-01-15")); // Monday
      const end = DateTime.fromISO("2024-01-08"); // Previous Monday

      const diff = start.diffBusinessDays(end);
      expect(diff.as("days")).toBe(-5); // -5 business days (Fri, Thu, Wed, Tue, Mon)
    });

    it("should handle two equal dates", () => {
      const start = create(DateTime.fromISO("2024-01-15")); // Monday
      const diff = start.diffBusinessDays(DateTime.fromISO("2024-01-15"));
      expect(diff.as("days")).toBe(0);
    });

    it("should exclude starting day when option is set", () => {
      const start = create(DateTime.fromISO("2024-01-08")); // Monday
      const end = DateTime.fromISO("2024-01-15"); // Next Monday

      const diff = start.diffBusinessDays(end, {
        excludeStartingDay: true,
      });
      expect(diff.as("days")).toBe(4); // 4 business days (Tue-Fri)
    });

    it("should exclude starting day also when going backwards", () => {
      const start = create(DateTime.fromISO("2024-01-15")); // Monday
      const end = create(DateTime.fromISO("2024-01-08")); // Previous Monday

      const diff = start.diffBusinessDays(end, {
        excludeStartingDay: true,
      });
      expect(diff.as("days")).toBe(-4); // 4 business days (Fri, Thu, Wed, Tue)
    });

    it("should handle holidays correctly", () => {
      const isWorkersDay = (date) => date.month === 5 && date.day === 1; // Workers' Day

      const start = create(
        DateTime.fromISO("2024-04-30"), // Tuesday
        {
          holidayMatchers: [isWorkersDay],
        }
      );

      const end = DateTime.fromISO("2024-05-03"); // Friday

      const diff = start.diffBusinessDays(end);
      const diffWithoutStart = start.diffBusinessDays(end, {
        excludeStartingDay: true,
      });
      expect(diff.as("days")).toBe(2); // 2 business days (Tue, Thu) - Wed is a holiday
      expect(diffWithoutStart.as("days")).toBe(1); // 1 business days (Thu) - Wed is a holiday
    });

    it("should handle weekend start date", () => {
      const start = create(DateTime.fromISO("2024-01-06")); // Saturday
      const end = DateTime.fromISO("2024-01-12"); // Next Saturday

      const diff = start.diffBusinessDays(end);
      const diffWithoutStart = start.diffBusinessDays(end, {
        excludeStartingDay: true,
      });
      expect(diff.as("days")).toBe(4); // 4 business days (Mon-Thu)
      expect(diffWithoutStart.as("days")).toBe(4); // 4 business days (Mon-Thu)
    });

    it("should handle weekend end date", () => {
      const start = create(DateTime.fromISO("2024-01-01")); // Monday
      const end = DateTime.fromISO("2024-01-07"); // Sunday

      const diff = start.diffBusinessDays(end);
      const diffWithoutStart = start.diffBusinessDays(end, {
        excludeStartingDay: true,
      });
      expect(diff.as("days")).toBe(5); // 5 business days (Mon-Fri)
      expect(diffWithoutStart.as("days")).toBe(4); // 4 business days (Tue-Fri)
    });

    it("should handle weekend start and end dates", () => {
      const start = create(DateTime.fromISO("2024-01-06")); // Saturday
      const end = DateTime.fromISO("2024-01-14"); // Next Sunday

      const diff = start.diffBusinessDays(end);
      const diffWithoutStart = start.diffBusinessDays(end, {
        excludeStartingDay: true,
      });
      expect(diff.as("days")).toBe(5); // 5 business days (Mon-Fri)
      expect(diffWithoutStart.as("days")).toBe(5); // 4 business days (Tue-Fri)
    });

    it("should handle holiday start date", () => {
      const isNewYearsDay = (date) => date.month === 1 && date.day === 1;

      const start = create(
        DateTime.fromISO("2024-01-01"), // Monday, January 1st (holiday)
        {
          holidayMatchers: [isNewYearsDay],
        }
      );
      const end = DateTime.fromISO("2024-01-06"); // Saturday

      const diff = start.diffBusinessDays(end);
      const diffWithoutStart = start.diffBusinessDays(end, {
        excludeStartingDay: true,
      });
      expect(diff.as("days")).toBe(4); // 4 business days (Tue-Fri)
      expect(diffWithoutStart.as("days")).toBe(4); // 4 business days (Tue-Fri)
    });

    it("should handle holiday end date", () => {
      const isWorkersDay = (date) => date.month === 5 && date.day === 1;

      const start = create(
        DateTime.fromISO("2024-04-29"), // Monday
        {
          holidayMatchers: [isWorkersDay],
        }
      );

      const end = DateTime.fromISO("2024-05-01"); // Wednesday (Workers' Day)

      const diff = start.diffBusinessDays(end);
      expect(diff.as("days")).toBe(2); // 1 business days (Mon, Tue)
    });

    it("should reject invalid DateTime objects", () => {
      const start = create(DateTime.fromISO("2024-01-01")); // Monday
      const invalidStart = create(DateTime.fromISO("2024-01-32")); // Invalid date

      const end = DateTime.fromISO("2024-01-08");
      const invalidEnd = DateTime.fromISO("2024-13-08"); // Invalid date

      const diffStart = start.diffBusinessDays(invalidEnd);
      const diffInvalidStart = invalidStart.diffBusinessDays(end);
      expect(diffStart.isValid).toBe(false);
      expect(diffStart.as("days")).toBe(NaN);
      expect(diffInvalidStart.isValid).toBe(false);
      expect(diffInvalidStart.as("days")).toBe(NaN);
    });
  });

  // Test plusBusiness method
  describe("plusBusiness", () => {
    it("should add business days correctly", () => {
      const start = create(
        DateTime.fromISO("2024-01-01") // Monday
      );
      const result = start.plusBusiness(3);

      expect(result.toISODate()).toBe("2024-01-04"); // Thursday
    });

    it("should skip weekends when adding business days", () => {
      const start = create(DateTime.fromISO("2024-01-01")); // Monday
      const result = start.plusBusiness(6);

      expect(result.toISODate()).toBe("2024-01-09"); // Tuesday (skips weekend)
    });

    it("should skip holidays when adding business days", () => {
      const isWorkersDay = (date) => date.month === 5 && date.day === 1;

      const start = create(
        DateTime.fromISO("2024-04-29"), // Monday
        {
          holidayMatchers: [isWorkersDay],
        }
      );
      const result = start.plusBusiness(2);

      expect(result.toISODate()).toBe("2024-05-02"); // Thursday (skips Wednesday holiday and counts Monday and Tuesday)
    });

    it("should handle week units", () => {
      const start = create(DateTime.fromISO("2024-01-01")); // Monday
      const result = start.plusBusiness(1, "week");

      expect(result.toISODate()).toBe("2024-01-10"); // Next Wednesday (7 business days)
    });

    it("should handle month units", () => {
      const start = create(DateTime.fromISO("2024-02-01")); // Monday
      const result = start.plusBusiness(1, "month");

      expect(result.toISODate()).toBe("2024-03-14"); // Next Friday (30 business days, no matter which month)
    });

    it("should correctly add business days starting from a weekend", () => {
      const withStartingDay = create(
        DateTime.fromISO("2024-01-07") // Sunday
      );
      const withoutStartingDay = create(
        DateTime.fromISO("2024-01-07"), // Sunday
        { excludeStartingDay: true }
      );

      const resultWithStartingDay = withStartingDay.plusBusiness(1);
      const resultWithoutStartingDay = withoutStartingDay.plusBusiness(1);

      expect(resultWithStartingDay.toISODate()).toBe("2024-01-08"); // Monday
      expect(resultWithoutStartingDay.toISODate()).toBe("2024-01-08"); // Monday
    });

    it("should correctly add business days starting from a holiday", () => {
      const isNewYears = (date) => date.month === 1 && date.day === 1;

      const withStartingDay = create(
        DateTime.fromISO("2024-01-01"), // Monday (holiday)
        {
          holidayMatchers: [isNewYears],
        }
      );
      const withoutStartingDay = create(
        DateTime.fromISO("2024-01-01"), // Monday (holiday)
        {
          holidayMatchers: [isNewYears],
        }
      );

      const resultWithStartingDay = withStartingDay.plusBusiness(1);
      const resultWithoutStartingDay = withoutStartingDay.plusBusiness(1);

      expect(resultWithStartingDay.toISODate()).toBe("2024-01-02"); // Tuesday
      expect(resultWithoutStartingDay.toISODate()).toBe("2024-01-02"); // Tuesday
    });

    it("should handle multiple holidays and weekends when adding business days", () => {
      const isChristmas = (date) => date.month === 12 && date.day === 25;
      const isBoxingDay = (date) => date.month === 12 && date.day === 26;
      const isNewYears = (date) => date.month === 1 && date.day === 1;

      const start = create(
        DateTime.fromISO("2024-12-23"), // Monday
        {
          holidayMatchers: [isChristmas, isBoxingDay, isNewYears],
        }
      );
      const result = start.plusBusiness(5);

      expect(result.toISODate()).toBe("2025-01-02"); // Should be Thursday of the following week, skipping holidays and weekend
    });

    it("should correctly handle adding zero business days", () => {
      const start = create(DateTime.fromISO("2024-01-01")); // Monday
      const result = start.plusBusiness(0);

      expect(result.toISODate()).toBe("2024-01-01"); // Should remain the same
    });
  });

  // Test minusBusiness method
  describe("minusBusiness", () => {
    it("should subtract business days correctly", () => {
      const start = create(DateTime.fromISO("2024-01-04")); // Thursday
      const result = start.minusBusiness(3);

      expect(result.toISODate()).toBe("2024-01-01"); // Monday
    });

    it("should skip weekends when subtracting business days", () => {
      const start = create(DateTime.fromISO("2024-01-08")); // Monday
      const result = start.minusBusiness(1);

      expect(result.toISODate()).toBe("2024-01-05"); // Friday (skips weekend)
    });

    it("should skip holidays when subtracting business days", () => {
      const isWorkersDay = (date) => date.month === 5 && date.day === 1; // Wednesday

      const start = create(
        DateTime.fromISO("2024-05-02"), // Thursday
        {
          holidayMatchers: [isWorkersDay],
        }
      );
      const result = start.minusBusiness(2);

      expect(result.toISODate()).toBe("2024-04-29"); // Monday (skips Wednesday holiday and counts Tuesday)
    });

    it("should correctly subtract business days ending on a weekend", () => {
      const start = create(DateTime.fromISO("2024-01-08")); // Monday
      const result = start.minusBusiness(1);

      expect(result.toISODate()).toBe("2024-01-05"); // Previous Friday (skips weekend)
    });

    it("should correctly subtract business days ending on a holiday", () => {
      const isNewYears = (date) => date.month === 1 && date.day === 1;
      const isChristmas = (date) => date.month === 12 && date.day === 25;

      const tuesdayAfterHoliday = create(
        DateTime.fromISO("2024-01-02"), // Tuesday
        {
          holidayMatchers: [isNewYears],
        }
      );
      const beforeTuesday = tuesdayAfterHoliday.minusBusiness(1);

      const thursdayAfterChristmas = create(
        DateTime.fromISO("2024-12-26"), // Thursday
        {
          holidayMatchers: [isChristmas],
        }
      );
      const beforeThursday = thursdayAfterChristmas.minusBusiness(1);

      expect(beforeTuesday.toISODate()).toBe("2023-12-29"); // Friday, skipping Monday holiday and weekend
      expect(beforeThursday.toISODate()).toBe("2024-12-24"); // Tuesday, skipping Christmas holiday
    });

    it("should handle multiple holidays and weekends when subtracting business days", () => {
      const isChristmas = (date) => date.month === 12 && date.day === 25;
      const isBoxingDay = (date) => date.month === 12 && date.day === 26;

      const start = create(
        DateTime.fromISO("2024-12-27"), // Friday
        {
          holidayMatchers: [isChristmas, isBoxingDay],
        }
      );
      const result = start.minusBusiness(3);

      expect(result.toISODate()).toBe("2024-12-20"); // Friday, skipping Thu and Wed, counting Tue and Mon.
    });

    it("should correctly handle subtracting zero business days", () => {
      const start = create(DateTime.fromISO("2023-01-02")); // Monday
      const result = start.minusBusiness(0);

      expect(result.toISODate()).toBe("2023-01-02"); // Should remain the same
    });
  });

  // Test Luxon methods passthrough
  describe("Luxon methods passthrough", () => {
    it("should allow access to Luxon DateTime methods", () => {
      const calendar = create(DateTime.fromISO("2024-01-28"));

      expect(calendar.year).toBe(2024);
      expect(calendar.month).toBe(1);
      expect(calendar.day).toBe(28);
      expect(calendar.toISODate()).toBe("2024-01-28");
    });

    it("should return BusinessDayCalendar from Luxon methods that return DateTime", () => {
      const calendar = create(DateTime.fromISO("2024-01-28"));
      const tomorrow = calendar.plus({ days: 1 });

      expect(tomorrow).toBeInstanceOf(BusinessDayCalendar);
      expect(tomorrow.toISODate()).toBe("2024-01-29");
      expect(tomorrow.isBusinessDay).toBeDefined();
    });
  });
});
