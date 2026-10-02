import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import * as pt from "../../src/holidays/countries/pt.js";
import { listHolidays } from "../../src/holidays/index.js";

// Easter Sunday 2026 is on April 5
const NATIONAL_2026 = [
  { name: "Ano Novo", month: 1, day: 1 },
  { name: "Sexta-feira Santa", month: 4, day: 3 },
  { name: "Domingo de Páscoa", month: 4, day: 5 },
  { name: "Dia da Liberdade", month: 4, day: 25 },
  { name: "Dia do Trabalhador", month: 5, day: 1 },
  { name: "Corpo de Deus", month: 6, day: 4 },
  { name: "Dia de Portugal", month: 6, day: 10 },
  { name: "Assunção de Nossa Senhora", month: 8, day: 15 },
  { name: "Implantação da República", month: 10, day: 5 },
  { name: "Todos os Santos", month: 11, day: 1 },
  { name: "Restauração da Independência", month: 12, day: 1 },
  { name: "Imaculada Conceição", month: 12, day: 8 },
  { name: "Natal", month: 12, day: 25 },
];

describe("Portuguese Holidays", () => {
  it("should list the 2026 nationwide holidays", () => {
    expect(listHolidays(pt.getHolidays(), 2026)).toEqual(NATIONAL_2026);
  });

  it("should not treat Carnival Tuesday as a public holiday", () => {
    // Carnival Tuesday 2026 is on February 17
    const names = listHolidays(pt.getHolidays(), 2026).map(
      (h) => `${h.month}-${h.day}`
    );
    expect(names).not.toContain("2-17");
  });

  it("should list the 2026 holidays of the Azores (20)", () => {
    expect(listHolidays(pt.getRegionalHolidays()["20"], 2026)).toEqual([
      { name: "Ano Novo", month: 1, day: 1 },
      { name: "Sexta-feira Santa", month: 4, day: 3 },
      { name: "Domingo de Páscoa", month: 4, day: 5 },
      { name: "Dia da Liberdade", month: 4, day: 25 },
      { name: "Dia do Trabalhador", month: 5, day: 1 },
      { name: "Segunda-feira do Espírito Santo", month: 5, day: 25 },
      { name: "Corpo de Deus", month: 6, day: 4 },
      { name: "Dia de Portugal", month: 6, day: 10 },
      { name: "Assunção de Nossa Senhora", month: 8, day: 15 },
      { name: "Implantação da República", month: 10, day: 5 },
      { name: "Todos os Santos", month: 11, day: 1 },
      { name: "Restauração da Independência", month: 12, day: 1 },
      { name: "Imaculada Conceição", month: 12, day: 8 },
      { name: "Natal", month: 12, day: 25 },
    ]);
  });

  it("should list the 2026 holidays of Madeira (30)", () => {
    expect(listHolidays(pt.getRegionalHolidays()["30"], 2026)).toEqual([
      { name: "Ano Novo", month: 1, day: 1 },
      { name: "Sexta-feira Santa", month: 4, day: 3 },
      { name: "Domingo de Páscoa", month: 4, day: 5 },
      { name: "Dia da Liberdade", month: 4, day: 25 },
      { name: "Dia do Trabalhador", month: 5, day: 1 },
      { name: "Corpo de Deus", month: 6, day: 4 },
      { name: "Dia de Portugal", month: 6, day: 10 },
      {
        name: "Dia da Região Autónoma da Madeira e das Comunidades Madeirenses",
        month: 7,
        day: 1,
      },
      { name: "Assunção de Nossa Senhora", month: 8, day: 15 },
      { name: "Implantação da República", month: 10, day: 5 },
      { name: "Todos os Santos", month: 11, day: 1 },
      { name: "Restauração da Independência", month: 12, day: 1 },
      { name: "Imaculada Conceição", month: 12, day: 8 },
      { name: "Natal", month: 12, day: 25 },
      { name: "Primeira Oitava", month: 12, day: 26 },
    ]);
  });

  it("should expose both autonomous regions and include the nationwide holidays in each", () => {
    const regional = pt.getRegionalHolidays();
    expect(Object.keys(regional).sort()).toEqual(["20", "30"]);
    for (const region of Object.keys(regional)) {
      expect(listHolidays(regional[region], 2026)).toEqual(
        expect.arrayContaining(NATIONAL_2026)
      );
    }
  });

  it("should compute the Easter-based holidays from Easter Sunday", () => {
    // Easter Sunday 2025 is on April 20
    expect(pt.isGoodFriday(DateTime.fromISO("2025-04-18"))).toBe(true);
    expect(pt.isEasterSunday(DateTime.fromISO("2025-04-20"))).toBe(true);
    expect(pt.isWhitMonday(DateTime.fromISO("2025-06-09"))).toBe(true);
    expect(pt.isCorpusChristi(DateTime.fromISO("2025-06-19"))).toBe(true);
    expect(pt.isCorpusChristi(DateTime.fromISO("2025-06-20"))).toBe(false);
  });
});
