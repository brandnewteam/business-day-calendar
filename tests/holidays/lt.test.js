import { describe, it, expect } from "vitest";
import * as lt from "../../src/holidays/countries/lt.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Lithuanian Holidays", () => {
  it("should list the 2026 nationwide holidays", () => {
    // Easter Sunday 2026 is on April 5
    expect(listHolidays(lt.getHolidays(), 2026)).toEqual([
      { name: "Naujieji metai", month: 1, day: 1 },
      { name: "Lietuvos valstybės atkūrimo diena", month: 2, day: 16 },
      { name: "Lietuvos nepriklausomybės atkūrimo diena", month: 3, day: 11 },
      { name: "Velykos", month: 4, day: 5 },
      { name: "Antroji Velykų diena", month: 4, day: 6 },
      { name: "Tarptautinė darbo diena", month: 5, day: 1 },
      { name: "Motinos diena", month: 5, day: 3 },
      { name: "Tėvo diena", month: 6, day: 7 },
      { name: "Joninės", month: 6, day: 24 },
      { name: "Valstybės diena", month: 7, day: 6 },
      { name: "Žolinė", month: 8, day: 15 },
      { name: "Visų šventųjų diena", month: 11, day: 1 },
      { name: "Vėlinės", month: 11, day: 2 },
      { name: "Kūčios", month: 12, day: 24 },
      { name: "Kalėdos", month: 12, day: 25 },
      { name: "Antroji Kalėdų diena", month: 12, day: 26 },
    ]);
  });

  describe("Vėlinės (public holiday since 2020)", () => {
    it("should not be listed in 2019", () => {
      const names2019 = listHolidays(lt.getHolidays(), 2019).map((h) => h.name);
      expect(names2019).not.toContain("Vėlinės");
      expect(names2019).toHaveLength(15);
    });

    it("should be listed in 2020", () => {
      expect(listHolidays(lt.getHolidays(), 2020)).toContainEqual({
        name: "Vėlinės",
        month: 11,
        day: 2,
      });
    });
  });
});
