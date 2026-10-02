import { describe, it, expect } from "vitest";
import * as nl from "../../src/holidays/countries/nl.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Dutch Holidays", () => {
  it("should list the 2026 national holidays", () => {
    expect(listHolidays(nl.getHolidays(), 2026)).toEqual([
      { name: "Nieuwjaarsdag", month: 1, day: 1 },
      { name: "Eerste Paasdag", month: 4, day: 5 },
      { name: "Tweede Paasdag", month: 4, day: 6 },
      { name: "Koningsdag", month: 4, day: 27 },
      { name: "Hemelvaartsdag", month: 5, day: 14 },
      { name: "Eerste Pinksterdag", month: 5, day: 24 },
      { name: "Tweede Pinksterdag", month: 5, day: 25 },
      { name: "Eerste Kerstdag", month: 12, day: 25 },
      { name: "Tweede Kerstdag", month: 12, day: 26 },
    ]);
  });

  it("should not include Goede Vrijdag or Bevrijdingsdag in the default set", () => {
    const names = listHolidays(nl.getHolidays(), 2026).map((h) => h.name);
    expect(names).not.toContain("Goede Vrijdag");
    expect(names).not.toContain("Bevrijdingsdag");
  });

  it("should expose Goede Vrijdag and Bevrijdingsdag as opt-in matchers", () => {
    expect(listHolidays([nl.isGoodFriday, nl.isLiberationDay], 2026)).toEqual([
      { name: "Goede Vrijdag", month: 4, day: 3 },
      { name: "Bevrijdingsdag", month: 5, day: 5 },
    ]);
  });

  it("should move Koningsdag to Saturday April 26 when April 27 is a Sunday", () => {
    const kingsDay = (year) =>
      listHolidays(nl.getHolidays(), year).find((h) => h.name === "Koningsdag");
    expect(kingsDay(2025)).toEqual({ name: "Koningsdag", month: 4, day: 26 });
    expect(kingsDay(2014)).toEqual({ name: "Koningsdag", month: 4, day: 26 });
    expect(kingsDay(2024)).toEqual({ name: "Koningsdag", month: 4, day: 27 });
  });

  it("should use Koninginnedag (April 30) before 2014", () => {
    const names2013 = listHolidays(nl.getHolidays(), 2013).map((h) => h.name);
    expect(names2013).not.toContain("Koningsdag");
    expect(listHolidays(nl.getHolidays(), 2013)).toContainEqual({
      name: "Koninginnedag",
      month: 4,
      day: 30,
    });
    expect(
      listHolidays(nl.getHolidays(), 2014).map((h) => h.name)
    ).not.toContain("Koninginnedag");
  });

  it("should move Koninginnedag to Saturday April 29 when April 30 is a Sunday", () => {
    for (const year of [1989, 1995, 2000, 2006]) {
      expect(listHolidays(nl.getHolidays(), year)).toContainEqual({
        name: "Koninginnedag",
        month: 4,
        day: 29,
      });
    }
  });
});
