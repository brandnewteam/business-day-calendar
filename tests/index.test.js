import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import { createBusinessCalendar, BusinessDateTime } from "../src/index.js";

/**
 * A predicate that returns true when the given date is a holiday.
 * @callback HolidayMatcher
 * @param {DateTime} date
 * @returns {boolean}
 */

describe("BusinessDateTime", () => {
  describe("createBusinessCalendar", () => {
    it("should create a calendar with default options", () => {
      const businessCalendar = createBusinessCalendar();
      const bcNow = businessCalendar();

      expect(bcNow).toBeInstanceOf(BusinessDateTime);
      expect(bcNow.isValid).toBe(true);
      expect(bcNow.toISODate()).toBe(bcNow.toISODate());
    });

    it("should create a calendar by passing a DateTime", () => {
      const businessCalendar = createBusinessCalendar();
      const dtMonday = DateTime.fromISO("2024-01-01");
      const bcMonday = businessCalendar(dtMonday);

      expect(bcMonday).toBeInstanceOf(BusinessDateTime);
      expect(bcMonday.isValid).toBe(true);
      expect(bcMonday.toISO()).toBe(dtMonday.toISO());
    });

    it("should create a calendar with custom weekends day", () => {
      const options = {
        weekendDays: [5, 6], // Only Friday and Saturday are weekend days
      };

      const businessCalendar = createBusinessCalendar(options);

      const bcMonday = businessCalendar(DateTime.fromISO("2024-01-01"));
      const bcTuesday = businessCalendar(DateTime.fromISO("2024-01-02"));
      const bcWednesday = businessCalendar(DateTime.fromISO("2024-01-03"));
      const bcThursday = businessCalendar(DateTime.fromISO("2024-01-04"));
      const bcFriday = businessCalendar(DateTime.fromISO("2024-01-05"));
      const bcSaturday = businessCalendar(DateTime.fromISO("2024-01-06"));
      const bcSunday = businessCalendar(DateTime.fromISO("2024-01-07"));

      expect(bcMonday.isBusinessDay()).toBe(true);
      expect(bcTuesday.isBusinessDay()).toBe(true);
      expect(bcWednesday.isBusinessDay()).toBe(true);
      expect(bcThursday.isBusinessDay()).toBe(true);
      expect(bcFriday.isBusinessDay()).toBe(false);
      expect(bcSaturday.isBusinessDay()).toBe(false);
      expect(bcSunday.isBusinessDay()).toBe(true);
    });

    it("should create a calendar with holiday matchers", () => {
      /** @type {HolidayMatcher} */
      const isNewYearsDay = (date) => date.month === 1 && date.day === 1;

      const businessCalendar = createBusinessCalendar({
        holidayMatchers: [isNewYearsDay],
      });
      const monday = businessCalendar(DateTime.fromISO("2024-01-01")); // A holiday on Monday

      expect(monday.isHoliday()).toBe(true);
      expect(monday.isBusinessDay()).toBe(false);
    });

    it("should implement valueOf like DateTime", () => {
      const businessCalendar = createBusinessCalendar();

      const monday = DateTime.fromISO("2024-01-01");
      const businessMonday = businessCalendar(monday);

      const tuesday = DateTime.fromISO("2024-01-02");
      const businessTuesday = businessCalendar(tuesday);

      expect(businessMonday.valueOf()).toBe(monday.valueOf());
      expect(businessTuesday.valueOf()).toBe(tuesday.valueOf());
      expect(businessTuesday > businessMonday).toBe(true);
    });

    it("should implement toString like DateTime", () => {
      const businessCalendar = createBusinessCalendar();
      const monday = DateTime.fromISO("2024-01-01", { zone: "utc" });
      const businessMonday = businessCalendar(monday);

      expect(businessMonday.toString()).toBe(monday.toString());
      expect(businessMonday.toString()).toBe("2024-01-01T00:00:00.000Z");
    });

    it("should implement toLocaleString like DateTime", () => {
      const businessCalendar = createBusinessCalendar();
      const dtMonday = DateTime.fromISO("2024-01-01", { zone: "utc" });
      const bcMonday = businessCalendar(dtMonday);

      expect(bcMonday.toLocaleString()).toBe(dtMonday.toLocaleString());
    });

    it("should handle problematic weekend days array", () => {
      const onlyBusinessCalendar = createBusinessCalendar({
        weekendDays: [],
      });

      // There can be no business days if all days are weekends, plus/minus methods would cause infinite loops
      expect(
        createBusinessCalendar({ weekendDays: [1, 2, 3, 4, 5, 6, 7] })
      ).toThrow();

      // Outside of range
      expect(createBusinessCalendar({ weekendDays: [7, 8] })).toThrow();

      expect(
        createBusinessCalendar({ weekendDays: [0, 1, 2, 3, 4, 5, 6, 7, 8] })
      ).toThrow();

      const onlyBusiness = onlyBusinessCalendar(DateTime.fromISO("2024-01-01"));

      expect(onlyBusiness.isBusinessDay()).toBe(true);

      // Test adding business days with no weekend days
      expect(onlyBusiness.plusBusiness({ days: 5 }).toISODate()).toBe(
        "2024-01-06"
      );
      expect(onlyBusiness.plusBusiness({ days: 14 }).toISODate()).toBe(
        "2024-01-15"
      );
    });
  });

  describe("isBusinessDay", () => {
    it("should return true for business days", () => {
      const businessCalendar = createBusinessCalendar();
      const mon = businessCalendar(DateTime.fromISO("2024-01-01"));
      const tue = businessCalendar(DateTime.fromISO("2024-01-02"));
      const wed = businessCalendar(DateTime.fromISO("2024-01-03"));
      const thu = businessCalendar(DateTime.fromISO("2024-01-04"));
      const fri = businessCalendar(DateTime.fromISO("2024-01-05"));

      expect(mon.isBusinessDay()).toBe(true);
      expect(tue.isBusinessDay()).toBe(true);
      expect(wed.isBusinessDay()).toBe(true);
      expect(thu.isBusinessDay()).toBe(true);
      expect(fri.isBusinessDay()).toBe(true);
    });

    it("should return false for weekends", () => {
      const businessCalendar = createBusinessCalendar();
      const sat = businessCalendar(DateTime.fromISO("2024-01-27"));
      const sun = businessCalendar(DateTime.fromISO("2024-01-28"));

      expect(sat.isBusinessDay()).toBe(false);
      expect(sun.isBusinessDay()).toBe(false);
    });

    it("should return false for holidays on weekdays", () => {
      /** @type {HolidayMatcher} */
      const isWorkersDay = (date) => date.month === 5 && date.day === 1;

      const businessCalendar = createBusinessCalendar({
        holidayMatchers: [isWorkersDay],
      });

      const wed = businessCalendar(DateTime.fromISO("2024-05-01"));

      expect(wed.isBusinessDay()).toBe(false);
    });
  });

  describe("isHoliday", () => {
    it("should return true for dates matching holiday matchers", () => {
      /** @type {HolidayMatcher} */
      const isChristmas = (date) => date.month === 12 && date.day === 25;

      const businessCalendar = createBusinessCalendar({
        holidayMatchers: [isChristmas],
      });

      const wed = businessCalendar(
        DateTime.fromISO("2024-12-25") // Christmas on a Wednesday
      );

      expect(wed.isHoliday()).toBe(true);
    });

    it("should return false for dates not matching holiday matchers", () => {
      /** @type {HolidayMatcher} */
      const isChristmas = (date) => date.month === 12 && date.day === 25;

      const businessCalendar = createBusinessCalendar({
        holidayMatchers: [isChristmas],
      });

      const wed = businessCalendar(
        DateTime.fromISO("2024-12-18") // A week before Christmas
      );

      expect(wed.isHoliday()).toBe(false);
    });

    it("should work with multiple holiday matchers", () => {
      /** @type {HolidayMatcher} */
      const isChristmas = (date) => date.month === 12 && date.day === 25;
      /** @type {HolidayMatcher} */
      const isNewYears = (date) => date.month === 1 && date.day === 1;

      const businessCalendar = createBusinessCalendar({
        holidayMatchers: [isChristmas, isNewYears],
      });

      const jan1 = businessCalendar(DateTime.fromISO("2024-01-01"));
      const blueMonday = businessCalendar(DateTime.fromISO("2024-01-15"));
      const christmas = businessCalendar(DateTime.fromISO("2024-12-25"));

      expect(jan1.isHoliday()).toBe(true);
      expect(blueMonday.isHoliday()).toBe(false);
      expect(christmas.isHoliday()).toBe(true);
    });
  });

  describe("diffBusinessDays", () => {
    it("should work with either another BusinessDateTime or a plain DateTime", () => {
      const businessCalendar = createBusinessCalendar();

      const start = businessCalendar(
        DateTime.fromISO("2024-01-01") // Monday
      );

      const dtEnd = DateTime.fromISO("2024-01-08"); // Monday
      const calEnd = businessCalendar(DateTime.fromISO("2024-01-08")); // Monday

      expect(start.diffBusinessDays(dtEnd).as("days")).toBe(5); // 5 business days (Mon, Tue, Wed, Thu, Fri)
      expect(start.diffBusinessDays(calEnd).as("days")).toBe(5); // 5 business days (Mon, Tue, Wed, Thu, Fri)
    });

    it("should count business days between two dates with weekend in between", () => {
      const businessCalendar = createBusinessCalendar();
      const mon = businessCalendar(DateTime.fromISO("2024-01-08")); // Monday
      const nextFri = DateTime.fromISO("2024-01-12"); // Next Friday
      const nextMon = DateTime.fromISO("2024-01-15"); // Next Monday

      const diffFri = mon.diffBusinessDays(nextFri);
      const diffMon = mon.diffBusinessDays(nextMon);

      expect(diffFri.as("days")).toBe(4); // 4 business days (Mon, Tue, Wed, Thu)
      expect(diffMon.as("days")).toBe(5); // 5 business days (Mon, Tue, Wed, Thu, Fri)
    });

    it("should handle backwards date differences", () => {
      const businessCalendar = createBusinessCalendar();
      const start = businessCalendar(DateTime.fromISO("2024-01-15")); // Monday
      const end = DateTime.fromISO("2024-01-08"); // Previous Monday

      const diff = start.diffBusinessDays(end);

      expect(diff.as("days")).toBe(-5); // -5 business days (Fri, Thu, Wed, Tue, Mon)
    });

    it("should handle two equal dates", () => {
      const businessCalendar = createBusinessCalendar();
      const start = businessCalendar(DateTime.fromISO("2024-01-15")); // Monday
      const diff = start.diffBusinessDays(DateTime.fromISO("2024-01-15"));

      expect(diff.as("days")).toBe(0);
    });

    it("should exclude starting day with selected option", () => {
      const businessCalendar = createBusinessCalendar();
      const start = businessCalendar(DateTime.fromISO("2024-01-08")); // Monday
      const end = DateTime.fromISO("2024-01-15"); // Next Monday

      const diff = start.diffBusinessDays(end, {
        excludeStartingDay: true,
      });

      expect(diff.as("days")).toBe(4); // 4 business days (Tue-Fri)
    });

    it("should exclude starting day also when going backwards", () => {
      const businessCalendar = createBusinessCalendar();
      const start = businessCalendar(DateTime.fromISO("2024-01-15")); // Monday
      const end = businessCalendar(DateTime.fromISO("2024-01-08")); // Previous Monday

      const diff = start.diffBusinessDays(end, {
        excludeStartingDay: true,
      });

      expect(diff.as("days")).toBe(-4); // 4 business days (Fri, Thu, Wed, Tue)
    });

    it("should handle holidays between two dates", () => {
      /** @type {HolidayMatcher} */
      const isWorkersDay = (date) => date.month === 5 && date.day === 1; // Workers' Day

      const businessCalendar = createBusinessCalendar({
        holidayMatchers: [isWorkersDay],
      });

      const start = businessCalendar(
        DateTime.fromISO("2024-04-30") // Tuesday
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
      const businessCalendar = createBusinessCalendar();
      const start = businessCalendar(DateTime.fromISO("2024-01-06")); // Saturday
      const end = DateTime.fromISO("2024-01-12"); // Next Saturday

      const diff = start.diffBusinessDays(end);
      const diffWithoutStart = start.diffBusinessDays(end, {
        excludeStartingDay: true,
      });

      expect(diff.as("days")).toBe(4); // 4 business days (Mon-Thu)
      expect(diffWithoutStart.as("days")).toBe(4); // 4 business days (Mon-Thu)
    });

    it("should handle weekend end date", () => {
      const businessCalendar = createBusinessCalendar();
      const start = businessCalendar(DateTime.fromISO("2024-01-01")); // Monday
      const end = DateTime.fromISO("2024-01-07"); // Sunday

      const diff = start.diffBusinessDays(end);
      const diffWithoutStart = start.diffBusinessDays(end, {
        excludeStartingDay: true,
      });

      expect(diff.as("days")).toBe(5); // 5 business days (Mon-Fri)
      expect(diffWithoutStart.as("days")).toBe(4); // 4 business days (Tue-Fri)
    });

    it("should handle weekend start and end dates", () => {
      const businessCalendar = createBusinessCalendar();
      const start = businessCalendar(DateTime.fromISO("2024-01-06")); // Saturday
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

      const businessCalendar = createBusinessCalendar({
        holidayMatchers: [isNewYearsDay],
      });

      const start = businessCalendar(
        DateTime.fromISO("2024-01-01") // Monday, January 1st (holiday)
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

      const businessCalendar = createBusinessCalendar({
        holidayMatchers: [isWorkersDay],
      });

      const start = businessCalendar(
        DateTime.fromISO("2024-04-29") // Monday
      );

      const end = DateTime.fromISO("2024-05-01"); // Wednesday (Workers' Day)
      const diff = start.diffBusinessDays(end);

      expect(diff.as("days")).toBe(2); // 1 business days (Mon, Tue)
    });

    it("should reject invalid DateTime objects", () => {
      const businessCalendar = createBusinessCalendar();

      const start = businessCalendar(DateTime.fromISO("2024-01-01")); // Monday
      const invalidStart = businessCalendar(DateTime.fromISO("2024-01-32")); // Invalid date

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

  describe("plusBusiness", () => {
    it("should add business days correctly", () => {
      const businessCalendar = createBusinessCalendar();

      const start = businessCalendar(
        DateTime.fromISO("2024-01-01") // Monday
      );

      const result = start.plusBusiness({ days: 3 });

      expect(result.toISODate()).toBe("2024-01-04"); // Thursday
    });

    it("should skip weekends when adding business days", () => {
      const businessCalendar = createBusinessCalendar();

      const start = businessCalendar(DateTime.fromISO("2024-01-01")); // Monday
      const result = start.plusBusiness({ days: 6 });

      expect(result.toISODate()).toBe("2024-01-09"); // Tuesday (skips weekend)
    });

    it("should skip holidays when adding business days", () => {
      const isWorkersDay = (date) => date.month === 5 && date.day === 1;

      const businessCalendar = createBusinessCalendar({
        holidayMatchers: [isWorkersDay],
      });

      const start = businessCalendar(
        DateTime.fromISO("2024-04-29") // Monday
      );

      const result = start.plusBusiness({ days: 2 });

      expect(result.toISODate()).toBe("2024-05-02"); // Thursday (skips Wednesday holiday and counts Monday and Tuesday)
    });

    it("should handle week units", () => {
      const businessCalendar = createBusinessCalendar();

      const start = businessCalendar(DateTime.fromISO("2024-01-01")); // Monday
      const result = start.plusBusiness({ weeks: 1 });

      expect(result.toISODate()).toBe("2024-01-10"); // Next Wednesday (7 business days)
      expect(result.diffBusinessDays(start).as("days")).toBe(-7); // 7 business days
      expect(result.diff(start).as("days")).toBe(9); // 9 natural days
    });

    it("should handle month units", () => {
      const businessCalendar = createBusinessCalendar();

      const start = businessCalendar(DateTime.fromISO("2024-02-01")); // Monday
      const result = start.plusBusiness({ months: 1 });

      expect(result.toISODate()).toBe("2024-03-14"); // 30 business days, no matter which month
      expect(result.diffBusinessDays(start).as("days")).toBe(-30); // 30 business days
      expect(result.diff(start).as("days")).toBe(42); // 42 natural days
    });

    it("should correctly add business days starting from a weekend", () => {
      const businessCalendar = createBusinessCalendar();

      const withStartingDay = businessCalendar(
        DateTime.fromISO("2024-01-07") // Sunday
      );
      const withoutStartingDay = businessCalendar(
        DateTime.fromISO("2024-01-07"), // Sunday
        { excludeStartingDay: true }
      );

      const resultWithStartingDay = withStartingDay.plusBusiness({ days: 1 });
      const resultWithoutStartingDay = withoutStartingDay.plusBusiness({
        days: 1,
      });

      expect(resultWithStartingDay.toISODate()).toBe("2024-01-08"); // Monday
      expect(resultWithoutStartingDay.toISODate()).toBe("2024-01-08"); // Monday
    });

    it("should correctly add business days starting from a holiday", () => {
      const isNewYears = (date) => date.month === 1 && date.day === 1;

      const businessCalendar = createBusinessCalendar({
        holidayMatchers: [isNewYears],
      });

      const withStartingDay = businessCalendar(
        DateTime.fromISO("2024-01-01") // Monday (holiday)
      );
      const withoutStartingDay = businessCalendar(
        DateTime.fromISO("2024-01-01"), // Monday (holiday)
        { excludeStartingDay: true }
      );

      const resultWithStartingDay = withStartingDay.plusBusiness({ days: 1 });
      const resultWithoutStartingDay = withoutStartingDay.plusBusiness({
        days: 1,
      });

      expect(resultWithStartingDay.toISODate()).toBe("2024-01-02"); // Tuesday
      expect(resultWithoutStartingDay.toISODate()).toBe("2024-01-02"); // Tuesday
    });

    it("should handle multiple holidays and weekends when adding business days", () => {
      const isChristmas = (date) => date.month === 12 && date.day === 25;
      const isBoxingDay = (date) => date.month === 12 && date.day === 26;
      const isNewYears = (date) => date.month === 1 && date.day === 1;

      const businessCalendar = createBusinessCalendar({
        holidayMatchers: [isChristmas, isBoxingDay, isNewYears],
      });

      const start = businessCalendar(
        DateTime.fromISO("2024-12-23") // Monday
      );
      const result = start.plusBusiness({ days: 5 });

      expect(result.toISODate()).toBe("2025-01-02"); // Should be Thursday of the following week, skipping holidays and weekend
    });

    it("should correctly handle adding zero business days", () => {
      const businessCalendar = createBusinessCalendar();
      const start = businessCalendar(DateTime.fromISO("2024-01-01")); // Monday

      expect(start.plusBusiness({ days: 0 }).toISODate()).toBe("2024-01-01"); // Should remain the same
      expect(start.plusBusiness().toISODate()).toBe("2024-01-01"); // Should remain the same
    });

    it("should handle adding a large number of business days", () => {
      /** @type {HolidayMatcher} */
      const isChristmas = (date) => date.month === 12 && date.day === 25;
      /** @type {HolidayMatcher} */
      const isBoxingDay = (date) => date.month === 12 && date.day === 26;
      /** @type {HolidayMatcher} */
      const isNewYears = (date) => date.month === 1 && date.day === 1;

      const businessCalendar = createBusinessCalendar({
        holidayMatchers: [isChristmas, isBoxingDay, isNewYears],
      });

      const start = businessCalendar(DateTime.fromISO("2024-01-01"));
      const result = start.plusBusiness({ years: 65 });

      // Calculate the expected date (this would be ~14.000+ calendar days ahead)
      expect(result.isBusinessDay()).toBe(true);
    });

    it("should round up fractional business day values", () => {
      const businessCalendar = createBusinessCalendar();

      const start = businessCalendar(DateTime.fromISO("2024-01-01")); // Monday
      const result1 = start.plusBusiness({ days: 1.7 });
      const result2 = start.plusBusiness({ days: 1.2 });

      expect(result1.toISODate()).toBe("2024-01-03"); // Should be same as adding 2
      expect(result2.toISODate()).toBe("2024-01-03"); // Should be same as adding 2
    });
  });

  describe("minusBusiness", () => {
    it("should subtract business days correctly", () => {
      const businessCalendar = createBusinessCalendar();

      const start = businessCalendar(DateTime.fromISO("2024-01-04")); // Thursday
      const result = start.minusBusiness({ days: 3 });

      expect(result.toISODate()).toBe("2024-01-01"); // Monday
    });

    it("should skip weekends when subtracting business days", () => {
      const businessCalendar = createBusinessCalendar();

      const start = businessCalendar(DateTime.fromISO("2024-01-08")); // Monday
      const result = start.minusBusiness({ days: 1 });

      expect(result.toISODate()).toBe("2024-01-05"); // Friday (skips weekend)
    });

    it("should skip holidays when subtracting business days", () => {
      const isWorkersDay = (date) => date.month === 5 && date.day === 1; // Wednesday

      const businessCalendar = createBusinessCalendar({
        holidayMatchers: [isWorkersDay],
      });

      const start = businessCalendar(
        DateTime.fromISO("2024-05-02") // Thursday
      );
      const result = start.minusBusiness({ days: 2 });

      expect(result.toISODate()).toBe("2024-04-29"); // Monday (skips Wednesday holiday and counts Tuesday)
    });

    it("should correctly subtract business days ending on a weekend", () => {
      const businessCalendar = createBusinessCalendar();

      const start = businessCalendar(DateTime.fromISO("2024-01-08")); // Monday
      const result = start.minusBusiness({ days: 1 });

      expect(result.toISODate()).toBe("2024-01-05"); // Previous Friday (skips weekend)
    });

    it("should correctly subtract business days ending on a holiday", () => {
      const isNewYears = (date) => date.month === 1 && date.day === 1;
      const isChristmas = (date) => date.month === 12 && date.day === 25;

      const calendarWithNewYear = createBusinessCalendar({
        holidayMatchers: [isNewYears],
      });
      const calendarWithChristmas = createBusinessCalendar({
        holidayMatchers: [isChristmas],
      });

      const tuesdayAfterNewYears = calendarWithNewYear(
        DateTime.fromISO("2024-01-02") // Tuesday
      );
      const beforeTuesday = tuesdayAfterNewYears.minusBusiness({ days: 1 });

      const thursdayAfterChristmas = calendarWithChristmas(
        DateTime.fromISO("2024-12-26") // Thursday
      );
      const beforeThursday = thursdayAfterChristmas.minusBusiness({ days: 1 });

      expect(beforeTuesday.toISODate()).toBe("2023-12-29"); // Friday, skipping Monday holiday and weekend
      expect(beforeThursday.toISODate()).toBe("2024-12-24"); // Tuesday, skipping Christmas holiday
    });

    it("should handle multiple holidays and weekends when subtracting business days", () => {
      const isChristmas = (date) => date.month === 12 && date.day === 25;
      const isBoxingDay = (date) => date.month === 12 && date.day === 26;

      const businessCalendar = createBusinessCalendar({
        holidayMatchers: [isChristmas, isBoxingDay],
      });

      const start = businessCalendar(
        DateTime.fromISO("2024-12-27") // Friday
      );
      const result = start.minusBusiness({ days: 3 });

      expect(result.toISODate()).toBe("2024-12-20"); // Friday, skipping Thu and Wed, counting Tue and Mon.
    });

    it("should correctly handle subtracting zero business days", () => {
      const businessCalendar = createBusinessCalendar();

      const start = businessCalendar(DateTime.fromISO("2024-01-01")); // Monday

      expect(start.minusBusiness({ days: 0 }).toISODate()).toBe("2024-01-01"); // Should remain the same
      expect(start.minusBusiness().toISODate()).toBe("2024-01-01"); // Should remain the same
    });
  });

  describe("Luxon methods passthrough", () => {
    it("should allow access to Luxon DateTime methods", () => {
      const businessCalendar = createBusinessCalendar();

      const calendar = businessCalendar(DateTime.fromISO("2024-01-28"));

      expect(calendar.year).toBe(2024);
      expect(calendar.month).toBe(1);
      expect(calendar.day).toBe(28);
      expect(calendar.weekday).toBe(7); // Sunday
      expect(calendar.toISODate()).toBe("2024-01-28");
    });

    it("should return BusinessDateTime from Luxon methods that return DateTime", () => {
      const businessCalendar = createBusinessCalendar();

      const calendar = businessCalendar(DateTime.fromISO("2024-01-27"));
      const tomorrow = calendar.plus({ days: 1 });

      expect(tomorrow).toBeInstanceOf(BusinessDateTime);
      expect(tomorrow.toISODate()).toBe("2024-01-28");
      expect(tomorrow.isBusinessDay).toBeDefined();
      expect(tomorrow.isHoliday).toBeDefined();
      expect(tomorrow.plusBusiness).toBeDefined();
      expect(tomorrow.minusBusiness).toBeDefined();
    });
  });
});
