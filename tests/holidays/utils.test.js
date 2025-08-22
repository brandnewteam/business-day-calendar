import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import {
  calculateEaster,
  calculateEasterMonday,
} from "../../src/holidays/utils.js";
import {
  combineHolidays,
  getWeekendAdjustedHolidays,
} from "../../src/holidays/index.js";

describe("Holiday Utilities", () => {
  describe("calculateEaster", () => {
    it("should calculate Easter Sunday correctly for various years", () => {
      // Test data for Easter dates
      const easterDates = {
        2022: { month: 4, day: 17 }, // April 17, 2022
        2023: { month: 4, day: 9 }, // April 9, 2023
        2024: { month: 3, day: 31 }, // March 31, 2024
        2025: { month: 4, day: 20 }, // April 20, 2025
        2026: { month: 4, day: 5 }, // April 5, 2026
      };

      for (const [year, date] of Object.entries(easterDates)) {
        const easter = calculateEaster(parseInt(year, 10));
        expect(easter.month).toBe(date.month);
        expect(easter.day).toBe(date.day);
        expect(easter.year).toBe(parseInt(year, 10));
      }
    });
  });

  describe("calculateEasterMonday", () => {
    it("should calculate Easter Monday correctly for various years", () => {
      // Test data for Easter Monday dates
      const easterMondayDates = {
        2022: { month: 4, day: 18 }, // April 18, 2022
        2023: { month: 4, day: 10 }, // April 10, 2023
        2024: { month: 4, day: 1 }, // April 1, 2024
        2025: { month: 4, day: 21 }, // April 21, 2025
        2026: { month: 4, day: 6 }, // April 6, 2026
      };

      for (const [year, date] of Object.entries(easterMondayDates)) {
        const easterMonday = calculateEasterMonday(parseInt(year, 10));
        expect(easterMonday.month).toBe(date.month);
        expect(easterMonday.day).toBe(date.day);
        expect(easterMonday.year).toBe(parseInt(year, 10));
      }
    });

    it("should handle month rollover correctly", () => {
      // In some edge cases, Easter could be on March 31, making Easter Monday April 1
      const easterMonday2024 = calculateEasterMonday(2024);
      expect(easterMonday2024).toEqual({ year: 2024, month: 4, day: 1 });
    });
  });

  describe("combineHolidays", () => {
    it("should combine holiday matcher arrays", () => {
      const matcher1 = (date) => date.month === 1 && date.day === 1;
      const matcher2 = (date) => date.month === 12 && date.day === 25;
      const matcher3 = (date) => date.month === 7 && date.day === 4;

      const holidays1 = [matcher1, matcher2];
      const holidays2 = [matcher2, matcher3];

      const combined = combineHolidays(holidays1, holidays2);

      // Should have 3 unique matchers
      expect(combined.length).toBe(3);
      expect(combined).toContain(matcher1);
      expect(combined).toContain(matcher2);
      expect(combined).toContain(matcher3);
    });

    it("should handle empty arrays", () => {
      const matcher1 = (date) => date.month === 1 && date.day === 1;
      const holidays1 = [matcher1];
      const holidays2 = [];

      const combined = combineHolidays(holidays1, holidays2);

      expect(combined.length).toBe(1);
      expect(combined).toContain(matcher1);
    });

    it("should eliminate duplicates", () => {
      const matcher1 = (date) => date.month === 1 && date.day === 1;
      const matcher2 = (date) => date.month === 12 && date.day === 25;

      const holidays1 = [matcher1, matcher2];
      const holidays2 = [matcher1, matcher2];

      const combined = combineHolidays(holidays1, holidays2);

      // Should have 2 unique matchers even though each appears twice in the input
      expect(combined.length).toBe(2);
      expect(combined).toContain(matcher1);
      expect(combined).toContain(matcher2);
    });
  });

  describe("getWeekendAdjustedHolidays", () => {
    // Create some test holiday matchers
    const newYearsDay = (date) => date.month === 1 && date.day === 1;
    const independenceDay = (date) => date.month === 7 && date.day === 4;

    it("should create weekend-adjusted holiday matchers", () => {
      const holidays = [newYearsDay, independenceDay];
      const adjustedHolidays = getWeekendAdjustedHolidays(holidays);

      expect(adjustedHolidays.length).toBe(2);

      const adjustedNewYears = adjustedHolidays[0];
      const adjustedIndependence = adjustedHolidays[1];

      // Test regular weekday holiday (no adjustment)
      // In 2025, New Year's Day (Jan 1) is a Wednesday
      const newYears2025 = DateTime.fromISO("2025-01-01");
      expect(adjustedNewYears(newYears2025)).toBe(true);

      // Test Friday observance for Saturday holiday
      // In 2026, Independence Day (July 4) is a Saturday, should observe on Friday, July 3
      const independenceDay2026 = DateTime.fromISO("2026-07-04");
      const observedIndependenceDay2026 = DateTime.fromISO("2026-07-03");

      expect(adjustedIndependence(independenceDay2026)).toBe(true);
      expect(adjustedIndependence(observedIndependenceDay2026)).toBe(true);

      // Test Monday observance for Sunday holiday
      // In 2027, Independence Day (July 4) is a Sunday, should observe on Monday, July 5
      const independenceDay2027 = DateTime.fromISO("2027-07-04");
      const observedIndependenceDay2027 = DateTime.fromISO("2027-07-05");

      expect(adjustedIndependence(independenceDay2027)).toBe(true);
      expect(adjustedIndependence(observedIndependenceDay2027)).toBe(true);
    });

    it("should not recognize random dates as holidays", () => {
      const holidays = [newYearsDay, independenceDay];
      const adjustedHolidays = getWeekendAdjustedHolidays(holidays);

      const adjustedNewYears = adjustedHolidays[0];
      const adjustedIndependence = adjustedHolidays[1];

      // Random date that's not a holiday
      const randomDate = DateTime.fromISO("2025-03-15");

      expect(adjustedNewYears(randomDate)).toBe(false);
      expect(adjustedIndependence(randomDate)).toBe(false);
    });
  });
});
