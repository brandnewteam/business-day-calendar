import { describe, it, expect } from "vitest";
import * as sk from "../../src/holidays/countries/sk.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Slovak Holidays", () => {
  it("should list the 2026 nationwide holidays", () => {
    expect(listHolidays(sk.getHolidays(), 2026)).toEqual([
      { name: "Deň vzniku Slovenskej republiky", month: 1, day: 1 },
      { name: "Zjavenie Pána", month: 1, day: 6 },
      { name: "Veľký piatok", month: 4, day: 3 },
      { name: "Veľkonočný pondelok", month: 4, day: 6 },
      { name: "Sviatok práce", month: 5, day: 1 },
      { name: "Sviatok svätého Cyrila a svätého Metoda", month: 7, day: 5 },
      { name: "Výročie Slovenského národného povstania", month: 8, day: 29 },
      { name: "Sviatok všetkých svätých", month: 11, day: 1 },
      { name: "Štedrý deň", month: 12, day: 24 },
      { name: "Prvý sviatok vianočný", month: 12, day: 25 },
      { name: "Druhý sviatok vianočný", month: 12, day: 26 },
    ]);
  });

  it("should treat Constitution Day as a day off only before 2025", () => {
    expect(listHolidays(sk.getHolidays(), 2024)).toContainEqual({
      name: "Deň Ústavy Slovenskej republiky",
      month: 9,
      day: 1,
    });
    expect(
      listHolidays(sk.getHolidays(), 2025).map((h) => h.name)
    ).not.toContain("Deň Ústavy Slovenskej republiky");
  });

  it("should treat Freedom and Democracy Day as a day off only before 2025", () => {
    expect(listHolidays(sk.getHolidays(), 2024)).toContainEqual({
      name: "Deň boja za slobodu a demokraciu",
      month: 11,
      day: 17,
    });
    expect(
      listHolidays(sk.getHolidays(), 2025).map((h) => h.name)
    ).not.toContain("Deň boja za slobodu a demokraciu");
  });

  it("should suspend Victory Day and Our Lady of Sorrows Day in 2026 only", () => {
    const victory = { name: "Deň víťazstva nad fašizmom", month: 5, day: 8 };
    const sorrows = { name: "Sedembolestná Panna Mária", month: 9, day: 15 };

    expect(listHolidays(sk.getHolidays(), 2025)).toContainEqual(victory);
    expect(listHolidays(sk.getHolidays(), 2025)).toContainEqual(sorrows);

    const names2026 = listHolidays(sk.getHolidays(), 2026).map((h) => h.name);
    expect(names2026).not.toContain(victory.name);
    expect(names2026).not.toContain(sorrows.name);

    expect(listHolidays(sk.getHolidays(), 2027)).toContainEqual(victory);
    expect(listHolidays(sk.getHolidays(), 2027)).toContainEqual(sorrows);
  });

  it("should list 15 days off in 2024, before any of the changes", () => {
    expect(listHolidays(sk.getHolidays(), 2024)).toHaveLength(15);
  });
});
