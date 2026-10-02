import { describe, it, expect } from "vitest";
import * as lv from "../../src/holidays/countries/lv.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Latvian Holidays", () => {
  it("should list the 2026 nationwide holidays", () => {
    // Easter Sunday 2026 is on April 5; May 4 (Monday) and November 18 (Wednesday) are weekdays
    expect(listHolidays(lv.getHolidays(), 2026)).toEqual([
      { name: "Jaungada diena", month: 1, day: 1 },
      { name: "Lielā Piektdiena", month: 4, day: 3 },
      { name: "Lieldienas", month: 4, day: 5 },
      { name: "Otrās Lieldienas", month: 4, day: 6 },
      { name: "Darba svētki", month: 5, day: 1 },
      {
        name: "Latvijas Republikas Neatkarības atjaunošanas diena",
        month: 5,
        day: 4,
      },
      { name: "Mātes diena", month: 5, day: 10 },
      { name: "Vasarsvētki", month: 5, day: 24 },
      { name: "Līgo diena", month: 6, day: 23 },
      { name: "Jāņu diena", month: 6, day: 24 },
      { name: "Latvijas Republikas proklamēšanas diena", month: 11, day: 18 },
      { name: "Ziemassvētku vakars", month: 12, day: 24 },
      { name: "Ziemassvētki", month: 12, day: 25 },
      { name: "Otrie Ziemassvētki", month: 12, day: 26 },
      { name: "Vecgada diena", month: 12, day: 31 },
    ]);
  });

  describe("Monday off when May 4 or November 18 falls on a weekend", () => {
    it("should add Monday May 6 when May 4 is a Saturday (2024)", () => {
      const may2024 = listHolidays(lv.getHolidays(), 2024).filter(
        (h) => h.name === "Latvijas Republikas Neatkarības atjaunošanas diena"
      );
      expect(may2024).toEqual([
        {
          name: "Latvijas Republikas Neatkarības atjaunošanas diena",
          month: 5,
          day: 4,
        },
        {
          name: "Latvijas Republikas Neatkarības atjaunošanas diena",
          month: 5,
          day: 6,
        },
      ]);
    });

    it("should add Monday November 20 when November 18 is a Saturday (2023)", () => {
      const nov2023 = listHolidays(lv.getHolidays(), 2023).filter(
        (h) => h.name === "Latvijas Republikas proklamēšanas diena"
      );
      expect(nov2023).toEqual([
        { name: "Latvijas Republikas proklamēšanas diena", month: 11, day: 18 },
        { name: "Latvijas Republikas proklamēšanas diena", month: 11, day: 20 },
      ]);
    });

    it("should add Monday May 5 when May 4 is a Sunday (2025)", () => {
      const may2025 = listHolidays(lv.getHolidays(), 2025).filter(
        (h) => h.name === "Latvijas Republikas Neatkarības atjaunošanas diena"
      );
      expect(may2025.map((h) => h.day)).toEqual([4, 5]);
    });

    it("should not add a Monday when the holiday is a weekday (2026)", () => {
      const nov2026 = listHolidays(lv.getHolidays(), 2026).filter(
        (h) => h.name === "Latvijas Republikas proklamēšanas diena"
      );
      expect(nov2026.map((h) => h.day)).toEqual([18]);
    });
  });
});
