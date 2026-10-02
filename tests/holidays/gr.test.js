import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import * as gr from "../../src/holidays/countries/gr.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Greek Holidays", () => {
  // Orthodox Easter 2026 is on April 12
  it("should list the 2026 mandatory nationwide holidays", () => {
    expect(listHolidays(gr.getHolidays(), 2026)).toEqual([
      { name: "Πρωτοχρονιά", month: 1, day: 1 },
      { name: "Θεοφάνεια", month: 1, day: 6 },
      { name: "Εθνική Επέτειος 25ης Μαρτίου", month: 3, day: 25 },
      { name: "Δευτέρα του Πάσχα", month: 4, day: 13 },
      { name: "Πρωτομαγιά", month: 5, day: 1 },
      { name: "Κοίμηση της Θεοτόκου", month: 8, day: 15 },
      { name: "Εθνική Επέτειος 28ης Οκτωβρίου", month: 10, day: 28 },
      { name: "Χριστούγεννα", month: 12, day: 25 },
      { name: "Σύναξη της Θεοτόκου", month: 12, day: 26 },
    ]);
  });

  it("should also list the 2026 customary holidays when requested", () => {
    expect(listHolidays(gr.getHolidays(true), 2026)).toEqual([
      { name: "Πρωτοχρονιά", month: 1, day: 1 },
      { name: "Θεοφάνεια", month: 1, day: 6 },
      { name: "Καθαρά Δευτέρα", month: 2, day: 23 },
      { name: "Εθνική Επέτειος 25ης Μαρτίου", month: 3, day: 25 },
      { name: "Μεγάλη Παρασκευή", month: 4, day: 10 },
      { name: "Δευτέρα του Πάσχα", month: 4, day: 13 },
      { name: "Πρωτομαγιά", month: 5, day: 1 },
      { name: "Αγίου Πνεύματος", month: 6, day: 1 },
      { name: "Κοίμηση της Θεοτόκου", month: 8, day: 15 },
      { name: "Εθνική Επέτειος 28ης Οκτωβρίου", month: 10, day: 28 },
      { name: "Χριστούγεννα", month: 12, day: 25 },
      { name: "Σύναξη της Θεοτόκου", month: 12, day: 26 },
    ]);
  });

  it("should not include the customary holidays in the default set", () => {
    const names = listHolidays(gr.getHolidays(), 2026).map((h) => h.name);
    expect(names).not.toContain("Καθαρά Δευτέρα");
    expect(names).not.toContain("Μεγάλη Παρασκευή");
    expect(names).not.toContain("Αγίου Πνεύματος");
  });

  it("should compute the Orthodox Easter-relative holidays for another year", () => {
    // Orthodox Easter 2025 is on April 20
    expect(gr.isCleanMonday(DateTime.fromISO("2025-03-03"))).toBe(true);
    expect(gr.isGoodFriday(DateTime.fromISO("2025-04-18"))).toBe(true);
    expect(gr.isEasterMonday(DateTime.fromISO("2025-04-21"))).toBe(true);
    expect(gr.isWhitMonday(DateTime.fromISO("2025-06-09"))).toBe(true);
    // Western Easter Monday 2025 (April 21) coincides, but Western Good Friday does not
    expect(gr.isGoodFriday(DateTime.fromISO("2025-04-18"))).toBe(true);
    expect(gr.isEasterMonday(DateTime.fromISO("2024-04-01"))).toBe(false);
    expect(gr.isEasterMonday(DateTime.fromISO("2024-05-06"))).toBe(true);
  });
});
