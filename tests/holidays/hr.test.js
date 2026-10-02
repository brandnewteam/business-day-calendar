import { describe, it, expect } from "vitest";
import * as hr from "../../src/holidays/countries/hr.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Croatian Holidays", () => {
  it("should list the 2026 nationwide holidays", () => {
    expect(listHolidays(hr.getHolidays(), 2026)).toEqual([
      { name: "Nova godina", month: 1, day: 1 },
      { name: "Bogojavljenje ili Sveta tri kralja", month: 1, day: 6 },
      { name: "Uskrs", month: 4, day: 5 },
      { name: "Uskrsni ponedjeljak", month: 4, day: 6 },
      { name: "Praznik rada", month: 5, day: 1 },
      { name: "Dan državnosti", month: 5, day: 30 },
      { name: "Tijelovo", month: 6, day: 4 },
      { name: "Dan antifašističke borbe", month: 6, day: 22 },
      {
        name: "Dan pobjede i domovinske zahvalnosti i Dan hrvatskih branitelja",
        month: 8,
        day: 5,
      },
      { name: "Velika Gospa", month: 8, day: 15 },
      { name: "Svi sveti", month: 11, day: 1 },
      {
        name: "Dan sjećanja na žrtve Domovinskog rata i Dan sjećanja na žrtvu Vukovara i Škabrnje",
        month: 11,
        day: 18,
      },
      { name: "Božić", month: 12, day: 25 },
      { name: "Sveti Stjepan", month: 12, day: 26 },
    ]);
  });

  it("should apply the May 30 Statehood Day and November 18 Remembrance Day only from 2020", () => {
    const names2019 = listHolidays(hr.getHolidays(), 2019).map((h) => h.name);
    expect(names2019).not.toContain("Dan državnosti");
    expect(names2019).not.toContain(
      "Dan sjećanja na žrtve Domovinskog rata i Dan sjećanja na žrtvu Vukovara i Škabrnje"
    );

    const list2020 = listHolidays(hr.getHolidays(), 2020);
    expect(list2020).toContainEqual({
      name: "Dan državnosti",
      month: 5,
      day: 30,
    });
    expect(list2020).toContainEqual({
      name: "Dan sjećanja na žrtve Domovinskog rata i Dan sjećanja na žrtvu Vukovara i Škabrnje",
      month: 11,
      day: 18,
    });
    expect(list2020).toHaveLength(14);
  });
});
