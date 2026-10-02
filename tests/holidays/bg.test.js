import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import * as bg from "../../src/holidays/countries/bg.js";
import { listHolidays } from "../../src/holidays/index.js";

const CYRIL_AND_METHODIUS =
  "Ден на светите братя Кирил и Методий, на българската азбука, просвета и култура и на славянската книжовност";
const LABOUR_DAY = "Ден на труда и на международната работническа солидарност";

describe("Bulgarian Holidays", () => {
  // Orthodox Easter 2026 is on April 12. May 24, September 6 and December 26 fall on a
  // weekend and are compensated on the next working day (Labour Code art. 154(2)).
  it("should list the 2026 nationwide holidays including substitute days", () => {
    expect(listHolidays(bg.getHolidays(), 2026)).toEqual([
      { name: "Нова година", month: 1, day: 1 },
      {
        name: "Ден на Освобождението на България от османско иго",
        month: 3,
        day: 3,
      },
      { name: "Велики петък", month: 4, day: 10 },
      { name: "Велика събота", month: 4, day: 11 },
      { name: "Великден", month: 4, day: 12 },
      { name: "Великден (втори ден)", month: 4, day: 13 },
      { name: LABOUR_DAY, month: 5, day: 1 },
      {
        name: "Гергьовден, Ден на храбростта и Българската армия",
        month: 5,
        day: 6,
      },
      { name: CYRIL_AND_METHODIUS, month: 5, day: 24 },
      { name: CYRIL_AND_METHODIUS, month: 5, day: 25 },
      { name: "Ден на Съединението", month: 9, day: 6 },
      { name: "Ден на Съединението", month: 9, day: 7 },
      { name: "Ден на Независимостта на България", month: 9, day: 22 },
      { name: "Бъдни вечер", month: 12, day: 24 },
      { name: "Рождество Христово", month: 12, day: 25 },
      { name: "Рождество Христово (втори ден)", month: 12, day: 26 },
      { name: "Рождество Христово (втори ден)", month: 12, day: 28 },
    ]);
  });

  it("should compensate two consecutive weekend holidays with two working days", () => {
    // December 25-26, 2021 fall on Saturday and Sunday
    const holidays = listHolidays(bg.getHolidays(), 2021);
    expect(holidays).toContainEqual({
      name: "Рождество Христово",
      month: 12,
      day: 27,
    });
    expect(holidays).toContainEqual({
      name: "Рождество Христово (втори ден)",
      month: 12,
      day: 28,
    });
    expect(bg.isChristmasDay(DateTime.fromISO("2021-12-29"))).toBe(false);
    expect(bg.isSecondDayOfChristmas(DateTime.fromISO("2021-12-29"))).toBe(
      false
    );
  });

  it("should skip the Easter days when looking for the substitute working day", () => {
    // May 1, 2021 is Holy Saturday (Orthodox Easter is May 2): the substitute day
    // is Tuesday May 4, after Easter Monday
    expect(bg.isLabourDay(DateTime.fromISO("2021-05-01"))).toBe(true);
    expect(bg.isLabourDay(DateTime.fromISO("2021-05-03"))).toBe(false);
    expect(bg.isLabourDay(DateTime.fromISO("2021-05-04"))).toBe(true);
  });

  it("should compensate a Sunday holiday followed by weekday holidays", () => {
    // December 24, 2023 is a Sunday; December 25-26 are Monday and Tuesday
    expect(bg.isChristmasEve(DateTime.fromISO("2023-12-27"))).toBe(true);
    expect(bg.isChristmasDay(DateTime.fromISO("2023-12-27"))).toBe(false);
    // January 1, 2023 is a Sunday; May 6, 2023 is a Saturday
    expect(bg.isNewYearsDay(DateTime.fromISO("2023-01-02"))).toBe(true);
    expect(bg.isSaintGeorgesDay(DateTime.fromISO("2023-05-08"))).toBe(true);
    expect(bg.isSaintGeorgesDay(DateTime.fromISO("2023-05-09"))).toBe(false);
  });

  it("should not grant substitute days for the Easter holidays", () => {
    // Holy Saturday and Easter Sunday 2026 are always on a weekend
    const easterTuesday = DateTime.fromISO("2026-04-14");
    for (const matcher of bg.getHolidays()) {
      expect(matcher(easterTuesday)).toBe(false);
    }
  });

  it("should not grant substitute days before 2017", () => {
    // May 1, 2016 is a Sunday
    expect(bg.isLabourDay(DateTime.fromISO("2016-05-01"))).toBe(true);
    expect(bg.isLabourDay(DateTime.fromISO("2016-05-02"))).toBe(false);
    // January 1, 2017 is a Sunday: first application of the rule
    expect(bg.isNewYearsDay(DateTime.fromISO("2017-01-02"))).toBe(true);
  });
});
