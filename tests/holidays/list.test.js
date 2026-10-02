import { describe, it, expect } from "vitest";
import {
  holidays,
  listHolidays,
  combineHolidays,
  getWeekendAdjustedHolidays,
} from "../../src/holidays/index.js";

describe("listHolidays", () => {
  it("should list Italian holidays for a year with name, month and day, sorted by date", () => {
    // Easter Sunday 2026 is on April 5
    expect(listHolidays(holidays.IT.all, 2026)).toEqual([
      { name: "Capodanno", month: 1, day: 1 },
      { name: "Epifania", month: 1, day: 6 },
      { name: "Pasqua", month: 4, day: 5 },
      { name: "Lunedì dell'Angelo", month: 4, day: 6 },
      { name: "Festa della Liberazione", month: 4, day: 25 },
      { name: "Festa dei Lavoratori", month: 5, day: 1 },
      { name: "Festa della Repubblica", month: 6, day: 2 },
      { name: "Assunzione di Maria", month: 8, day: 15 },
      { name: "San Francesco d'Assisi", month: 10, day: 4 },
      { name: "Ognissanti", month: 11, day: 1 },
      { name: "Immacolata Concezione", month: 12, day: 8 },
      { name: "Natale", month: 12, day: 25 },
      { name: "Santo Stefano", month: 12, day: 26 },
    ]);
  });

  it("should respect year-dependent holidays", () => {
    const names2025 = listHolidays(holidays.IT.all, 2025).map((h) => h.name);
    expect(names2025).not.toContain("San Francesco d'Assisi");
    expect(names2025).toHaveLength(12);
  });

  it("should list one entry per matched day when a matcher recognizes several days", () => {
    const regents = listHolidays(holidays.SM.all, 2025).filter(
      (h) => h.name === "Investitura dei Capitani Reggenti"
    );
    expect(regents).toEqual([
      { name: "Investitura dei Capitani Reggenti", month: 4, day: 1 },
      { name: "Investitura dei Capitani Reggenti", month: 10, day: 1 },
    ]);
  });

  it("should list US federal and all holidays, resolving floating weekday holidays", () => {
    const federal = listHolidays(holidays.US.federal, 2025);
    expect(federal).toContainEqual({
      name: "Thanksgiving Day",
      month: 11,
      day: 27,
    });
    expect(federal).toHaveLength(11);

    const all = listHolidays(holidays.US.all, 2025);
    expect(all).toContainEqual({ name: "Black Friday", month: 11, day: 28 });
    expect(all).toHaveLength(14);
  });

  it("should report shared holidays once when combining countries", () => {
    const combined = listHolidays(
      combineHolidays(holidays.IT.all, holidays.SM.all),
      2025
    );
    const newYears = combined.filter((h) => h.name === "Capodanno");
    expect(newYears).toHaveLength(1);

    // Country-specific holidays are still present
    expect(combined).toContainEqual({
      name: "Anniversario dell'Arengo",
      month: 3,
      day: 25,
    });
    expect(combined).toContainEqual({
      name: "Festa della Liberazione",
      month: 4,
      day: 25,
    });
  });

  it("should fall back to the function name for unnamed matchers", () => {
    const isFoundersDay = (date) => date.month === 9 && date.day === 15;
    expect(listHolidays([isFoundersDay], 2025)).toEqual([
      { name: "isFoundersDay", month: 9, day: 15 },
    ]);
  });

  it("should keep names on weekend-adjusted holidays and include the observed day", () => {
    // July 4, 2026 is a Saturday, observed on Friday July 3
    const adjusted = getWeekendAdjustedHolidays(holidays.US.federal);
    const independence = listHolidays(adjusted, 2026).filter(
      (h) => h.name === "Independence Day"
    );
    expect(independence).toEqual([
      { name: "Independence Day", month: 7, day: 3 },
      { name: "Independence Day", month: 7, day: 4 },
    ]);
  });

  it("should return an empty list when there are no matchers", () => {
    expect(listHolidays([], 2025)).toEqual([]);
  });
});
