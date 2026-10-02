import { describe, it, expect } from "vitest";
import * as si from "../../src/holidays/countries/si.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Slovenian Holidays", () => {
  it("should list the 2026 nationwide holidays", () => {
    expect(listHolidays(si.getHolidays(), 2026)).toEqual([
      { name: "Novo leto", month: 1, day: 1 },
      { name: "Novo leto", month: 1, day: 2 },
      { name: "Prešernov dan, slovenski kulturni praznik", month: 2, day: 8 },
      { name: "Velikonočna nedelja", month: 4, day: 5 },
      { name: "Velikonočni ponedeljek", month: 4, day: 6 },
      { name: "Dan upora proti okupatorju", month: 4, day: 27 },
      { name: "Praznik dela", month: 5, day: 1 },
      { name: "Praznik dela", month: 5, day: 2 },
      { name: "Binkoštna nedelja", month: 5, day: 24 },
      { name: "Dan državnosti", month: 6, day: 25 },
      { name: "Marijino vnebovzetje", month: 8, day: 15 },
      { name: "Dan reformacije", month: 10, day: 31 },
      { name: "Dan spomina na mrtve", month: 11, day: 1 },
      { name: "Božič", month: 12, day: 25 },
      { name: "Dan samostojnosti in enotnosti", month: 12, day: 26 },
    ]);
  });

  it("should not treat January 2 as a day off between 2013 and 2016", () => {
    const jan2 = { name: "Novo leto", month: 1, day: 2 };
    expect(listHolidays(si.getHolidays(), 2012)).toContainEqual(jan2);
    expect(listHolidays(si.getHolidays(), 2013)).not.toContainEqual(jan2);
    expect(listHolidays(si.getHolidays(), 2016)).not.toContainEqual(jan2);
    expect(listHolidays(si.getHolidays(), 2017)).toContainEqual(jan2);
    expect(listHolidays(si.getHolidays(), 2016)).toHaveLength(14);
  });
});
