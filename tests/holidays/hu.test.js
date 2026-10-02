import { describe, it, expect } from "vitest";
import * as hu from "../../src/holidays/countries/hu.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Hungarian Holidays", () => {
  it("should list the 2026 nationwide holidays", () => {
    expect(listHolidays(hu.getHolidays(), 2026)).toEqual([
      { name: "Újév", month: 1, day: 1 },
      {
        name: "Az 1848-as forradalom és szabadságharc ünnepe",
        month: 3,
        day: 15,
      },
      { name: "Nagypéntek", month: 4, day: 3 },
      { name: "Húsvéthétfő", month: 4, day: 6 },
      { name: "A munka ünnepe", month: 5, day: 1 },
      { name: "Pünkösdhétfő", month: 5, day: 25 },
      { name: "Az államalapítás ünnepe", month: 8, day: 20 },
      {
        name: "Az 1956-os forradalom és szabadságharc ünnepe",
        month: 10,
        day: 23,
      },
      { name: "Mindenszentek", month: 11, day: 1 },
      { name: "Karácsony", month: 12, day: 25 },
      { name: "Karácsony másnapja", month: 12, day: 26 },
    ]);
  });

  it("should treat Good Friday as a holiday only from 2017", () => {
    const names2016 = listHolidays(hu.getHolidays(), 2016).map((h) => h.name);
    expect(names2016).not.toContain("Nagypéntek");
    expect(names2016).toHaveLength(10);

    const list2017 = listHolidays(hu.getHolidays(), 2017);
    expect(list2017).toContainEqual({ name: "Nagypéntek", month: 4, day: 14 });
    expect(list2017).toHaveLength(11);
  });
});
