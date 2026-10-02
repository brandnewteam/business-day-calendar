import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import * as ro from "../../src/holidays/countries/ro.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Romanian Holidays", () => {
  // Orthodox Easter 2026 is on April 12; Whit Monday coincides with Children's Day
  it("should list the 2026 nationwide holidays", () => {
    expect(listHolidays(ro.getHolidays(), 2026)).toEqual([
      { name: "Anul Nou", month: 1, day: 1 },
      { name: "A doua zi de Anul Nou", month: 1, day: 2 },
      { name: "Boboteaza", month: 1, day: 6 },
      { name: "Soborul Sfântului Proroc Ioan Botezătorul", month: 1, day: 7 },
      { name: "Ziua Unirii Principatelor Române", month: 1, day: 24 },
      { name: "Vinerea Mare", month: 4, day: 10 },
      { name: "Paștele", month: 4, day: 12 },
      { name: "A doua zi de Paște", month: 4, day: 13 },
      { name: "Ziua Muncii", month: 5, day: 1 },
      { name: "Rusaliile", month: 5, day: 31 },
      { name: "Ziua Copilului", month: 6, day: 1 },
      { name: "A doua zi de Rusalii", month: 6, day: 1 },
      { name: "Adormirea Maicii Domnului", month: 8, day: 15 },
      { name: "Sfântul Andrei", month: 11, day: 30 },
      { name: "Ziua Națională a României", month: 12, day: 1 },
      { name: "Crăciunul", month: 12, day: 25 },
      { name: "A doua zi de Crăciun", month: 12, day: 26 },
    ]);
  });

  it("should recognize Epiphany and Saint John only from 2024", () => {
    expect(ro.isEpiphany(DateTime.fromISO("2023-01-06"))).toBe(false);
    expect(ro.isSaintJohnTheBaptist(DateTime.fromISO("2023-01-07"))).toBe(
      false
    );
    expect(ro.isEpiphany(DateTime.fromISO("2024-01-06"))).toBe(true);
    expect(ro.isSaintJohnTheBaptist(DateTime.fromISO("2024-01-07"))).toBe(true);
  });

  it("should recognize Good Friday only from 2018", () => {
    // Orthodox Easter: April 16, 2017 and April 8, 2018
    expect(ro.isGoodFriday(DateTime.fromISO("2017-04-14"))).toBe(false);
    expect(ro.isGoodFriday(DateTime.fromISO("2018-04-06"))).toBe(true);
  });

  it("should recognize Union Day and Children's Day only from 2017", () => {
    expect(ro.isUnionDay(DateTime.fromISO("2016-01-24"))).toBe(false);
    expect(ro.isChildrensDay(DateTime.fromISO("2016-06-01"))).toBe(false);
    expect(ro.isUnionDay(DateTime.fromISO("2017-01-24"))).toBe(true);
    expect(ro.isChildrensDay(DateTime.fromISO("2017-06-01"))).toBe(true);
  });

  it("should recognize Saint Andrew's Day only from 2012 and the Dormition only from 2009", () => {
    expect(ro.isSaintAndrewsDay(DateTime.fromISO("2011-11-30"))).toBe(false);
    expect(ro.isSaintAndrewsDay(DateTime.fromISO("2012-11-30"))).toBe(true);
    expect(ro.isAssumptionDay(DateTime.fromISO("2008-08-15"))).toBe(false);
    expect(ro.isAssumptionDay(DateTime.fromISO("2009-08-15"))).toBe(true);
  });

  it("should list fewer holidays in years before the recent additions", () => {
    expect(listHolidays(ro.getHolidays(), 2023)).toHaveLength(15);
    expect(listHolidays(ro.getHolidays(), 2016)).toHaveLength(12);
  });
});
