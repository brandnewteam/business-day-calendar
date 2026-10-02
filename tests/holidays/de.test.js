import { describe, it, expect } from "vitest";
import * as de from "../../src/holidays/countries/de.js";
import { listHolidays } from "../../src/holidays/index.js";

const NATIONAL_2026 = [
  { name: "Neujahr", month: 1, day: 1 },
  { name: "Karfreitag", month: 4, day: 3 },
  { name: "Ostermontag", month: 4, day: 6 },
  { name: "Tag der Arbeit", month: 5, day: 1 },
  { name: "Christi Himmelfahrt", month: 5, day: 14 },
  { name: "Pfingstmontag", month: 5, day: 25 },
  { name: "Tag der Deutschen Einheit", month: 10, day: 3 },
  { name: "Erster Weihnachtstag", month: 12, day: 25 },
  { name: "Zweiter Weihnachtstag", month: 12, day: 26 },
];

const REGIONS = [
  "BW",
  "BY",
  "BE",
  "BB",
  "HB",
  "HH",
  "HE",
  "MV",
  "NI",
  "NW",
  "RP",
  "SL",
  "SN",
  "ST",
  "SH",
  "TH",
];

describe("German Holidays", () => {
  it("should list the 2026 nationwide holidays", () => {
    expect(listHolidays(de.getHolidays(), 2026)).toEqual(NATIONAL_2026);
  });

  it("should list the 2026 holidays of Bayern", () => {
    expect(listHolidays(de.getRegionalHolidays().BY, 2026)).toEqual([
      { name: "Neujahr", month: 1, day: 1 },
      { name: "Heilige Drei Könige", month: 1, day: 6 },
      { name: "Karfreitag", month: 4, day: 3 },
      { name: "Ostermontag", month: 4, day: 6 },
      { name: "Tag der Arbeit", month: 5, day: 1 },
      { name: "Christi Himmelfahrt", month: 5, day: 14 },
      { name: "Pfingstmontag", month: 5, day: 25 },
      { name: "Fronleichnam", month: 6, day: 4 },
      { name: "Mariä Himmelfahrt", month: 8, day: 15 },
      { name: "Tag der Deutschen Einheit", month: 10, day: 3 },
      { name: "Allerheiligen", month: 11, day: 1 },
      { name: "Erster Weihnachtstag", month: 12, day: 25 },
      { name: "Zweiter Weihnachtstag", month: 12, day: 26 },
    ]);
  });

  it("should list the 2026 holidays of Sachsen", () => {
    expect(listHolidays(de.getRegionalHolidays().SN, 2026)).toEqual([
      { name: "Neujahr", month: 1, day: 1 },
      { name: "Karfreitag", month: 4, day: 3 },
      { name: "Ostermontag", month: 4, day: 6 },
      { name: "Tag der Arbeit", month: 5, day: 1 },
      { name: "Christi Himmelfahrt", month: 5, day: 14 },
      { name: "Pfingstmontag", month: 5, day: 25 },
      { name: "Tag der Deutschen Einheit", month: 10, day: 3 },
      { name: "Reformationstag", month: 10, day: 31 },
      { name: "Buß- und Bettag", month: 11, day: 18 },
      { name: "Erster Weihnachtstag", month: 12, day: 25 },
      { name: "Zweiter Weihnachtstag", month: 12, day: 26 },
    ]);
  });

  it("should list the 2026 holidays of Brandenburg", () => {
    expect(listHolidays(de.getRegionalHolidays().BB, 2026)).toEqual([
      { name: "Neujahr", month: 1, day: 1 },
      { name: "Karfreitag", month: 4, day: 3 },
      { name: "Ostersonntag", month: 4, day: 5 },
      { name: "Ostermontag", month: 4, day: 6 },
      { name: "Tag der Arbeit", month: 5, day: 1 },
      { name: "Christi Himmelfahrt", month: 5, day: 14 },
      { name: "Pfingstsonntag", month: 5, day: 24 },
      { name: "Pfingstmontag", month: 5, day: 25 },
      { name: "Tag der Deutschen Einheit", month: 10, day: 3 },
      { name: "Reformationstag", month: 10, day: 31 },
      { name: "Erster Weihnachtstag", month: 12, day: 25 },
      { name: "Zweiter Weihnachtstag", month: 12, day: 26 },
    ]);
  });

  it("should list the 2026 holidays of Saarland", () => {
    expect(listHolidays(de.getRegionalHolidays().SL, 2026)).toEqual([
      { name: "Neujahr", month: 1, day: 1 },
      { name: "Karfreitag", month: 4, day: 3 },
      { name: "Ostermontag", month: 4, day: 6 },
      { name: "Tag der Arbeit", month: 5, day: 1 },
      { name: "Christi Himmelfahrt", month: 5, day: 14 },
      { name: "Pfingstmontag", month: 5, day: 25 },
      { name: "Fronleichnam", month: 6, day: 4 },
      { name: "Mariä Himmelfahrt", month: 8, day: 15 },
      { name: "Tag der Deutschen Einheit", month: 10, day: 3 },
      { name: "Allerheiligen", month: 11, day: 1 },
      { name: "Erster Weihnachtstag", month: 12, day: 25 },
      { name: "Zweiter Weihnachtstag", month: 12, day: 26 },
    ]);
  });

  it("should expose all 16 Länder, each containing the nationwide set", () => {
    const regional = de.getRegionalHolidays();
    expect(Object.keys(regional).sort()).toEqual([...REGIONS].sort());
    for (const key of REGIONS) {
      const list = listHolidays(regional[key], 2026);
      for (const entry of NATIONAL_2026) {
        expect(list).toContainEqual(entry);
      }
    }
  });

  it("should give each Land its regional extras in 2026", () => {
    const regional = de.getRegionalHolidays();
    const names = (key) => listHolidays(regional[key], 2026).map((h) => h.name);

    expect(names("BW")).toEqual(
      expect.arrayContaining([
        "Heilige Drei Könige",
        "Fronleichnam",
        "Allerheiligen",
      ])
    );
    expect(names("BE")).toContain("Internationaler Frauentag");
    expect(names("HB")).toContain("Reformationstag");
    expect(names("HH")).toContain("Reformationstag");
    expect(names("HE")).toContain("Fronleichnam");
    expect(names("MV")).toEqual(
      expect.arrayContaining(["Internationaler Frauentag", "Reformationstag"])
    );
    expect(names("NI")).toContain("Reformationstag");
    expect(names("NW")).toEqual(
      expect.arrayContaining(["Fronleichnam", "Allerheiligen"])
    );
    expect(names("RP")).toEqual(
      expect.arrayContaining(["Fronleichnam", "Allerheiligen"])
    );
    expect(names("ST")).toEqual(
      expect.arrayContaining(["Heilige Drei Könige", "Reformationstag"])
    );
    expect(names("SH")).toContain("Reformationstag");
    expect(names("TH")).toEqual(
      expect.arrayContaining(["Weltkindertag", "Reformationstag"])
    );
    // Mariä Himmelfahrt is included for BY (statutory in the predominantly Catholic
    // municipalities, i.e. most of the Land, including München and Augsburg)
    expect(names("BY")).toContain("Mariä Himmelfahrt");
    expect(names("BY")).toHaveLength(13);
  });

  it("should apply Internationaler Frauentag in Berlin from 2019", () => {
    const berlin = de.getRegionalHolidays().BE;
    expect(listHolidays(berlin, 2018).map((h) => h.name)).not.toContain(
      "Internationaler Frauentag"
    );
    expect(listHolidays(berlin, 2019)).toContainEqual({
      name: "Internationaler Frauentag",
      month: 3,
      day: 8,
    });
  });

  it("should apply Internationaler Frauentag in Mecklenburg-Vorpommern from 2023", () => {
    const mv = de.getRegionalHolidays().MV;
    expect(listHolidays(mv, 2022).map((h) => h.name)).not.toContain(
      "Internationaler Frauentag"
    );
    expect(listHolidays(mv, 2023)).toContainEqual({
      name: "Internationaler Frauentag",
      month: 3,
      day: 8,
    });
  });

  it("should apply Weltkindertag in Thüringen from 2019", () => {
    const th = de.getRegionalHolidays().TH;
    expect(listHolidays(th, 2018).map((h) => h.name)).not.toContain(
      "Weltkindertag"
    );
    expect(listHolidays(th, 2019)).toContainEqual({
      name: "Weltkindertag",
      month: 9,
      day: 20,
    });
  });

  it("should apply Reformationstag in the northern Länder from 2018 but always in the east", () => {
    const regional = de.getRegionalHolidays();
    for (const key of ["HB", "HH", "NI", "SH"]) {
      expect(
        listHolidays(regional[key], 2016).map((h) => h.name)
      ).not.toContain("Reformationstag");
      expect(listHolidays(regional[key], 2018)).toContainEqual({
        name: "Reformationstag",
        month: 10,
        day: 31,
      });
    }
    for (const key of ["BB", "MV", "SN", "ST", "TH"]) {
      expect(listHolidays(regional[key], 2016)).toContainEqual({
        name: "Reformationstag",
        month: 10,
        day: 31,
      });
    }
  });

  it("should place Buß- und Bettag on the Wednesday before November 23", () => {
    const sn = de.getRegionalHolidays().SN;
    const bussUndBettag = (year) =>
      listHolidays(sn, year).find((h) => h.name === "Buß- und Bettag");
    expect(bussUndBettag(2024)).toEqual({
      name: "Buß- und Bettag",
      month: 11,
      day: 20,
    });
    expect(bussUndBettag(2025)).toEqual({
      name: "Buß- und Bettag",
      month: 11,
      day: 19,
    });
    expect(bussUndBettag(2027)).toEqual({
      name: "Buß- und Bettag",
      month: 11,
      day: 17,
    });
  });
});
