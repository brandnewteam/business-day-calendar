import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import * as cy from "../../src/holidays/countries/cy.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Cypriot Holidays", () => {
  // Orthodox Easter 2026 is on April 12
  it("should list the 2026 nationwide holidays", () => {
    expect(listHolidays(cy.getHolidays(), 2026)).toEqual([
      { name: "Πρωτοχρονιά", month: 1, day: 1 },
      { name: "Θεοφάνεια", month: 1, day: 6 },
      { name: "Καθαρά Δευτέρα", month: 2, day: 23 },
      { name: "Εθνική Επέτειος 25ης Μαρτίου", month: 3, day: 25 },
      { name: "Εθνική Επέτειος 1ης Απριλίου", month: 4, day: 1 },
      { name: "Μεγάλη Παρασκευή", month: 4, day: 10 },
      { name: "Δευτέρα του Πάσχα", month: 4, day: 13 },
      { name: "Πρωτομαγιά", month: 5, day: 1 },
      { name: "Αγίου Πνεύματος", month: 6, day: 1 },
      { name: "Κοίμηση της Θεοτόκου", month: 8, day: 15 },
      { name: "Ημέρα Ανεξαρτησίας της Κύπρου", month: 10, day: 1 },
      { name: "Επέτειος 28ης Οκτωβρίου", month: 10, day: 28 },
      { name: "Χριστούγεννα", month: 12, day: 25 },
      { name: "Δεύτερη μέρα των Χριστουγέννων", month: 12, day: 26 },
    ]);
  });

  it("should not treat bank-only days (Easter Tuesday, Christmas Eve) as holidays", () => {
    const easterTuesday = DateTime.fromISO("2026-04-14");
    const christmasEve = DateTime.fromISO("2026-12-24");
    for (const matcher of cy.getHolidays()) {
      expect(matcher(easterTuesday)).toBe(false);
      expect(matcher(christmasEve)).toBe(false);
    }
  });

  it("should compute the Orthodox Easter-relative holidays for another year", () => {
    // Orthodox Easter 2024 is on May 5
    expect(cy.isCleanMonday(DateTime.fromISO("2024-03-18"))).toBe(true);
    expect(cy.isGoodFriday(DateTime.fromISO("2024-05-03"))).toBe(true);
    expect(cy.isEasterMonday(DateTime.fromISO("2024-05-06"))).toBe(true);
    expect(cy.isWhitMonday(DateTime.fromISO("2024-06-24"))).toBe(true);
    // Western Easter Monday 2024 (April 1) is not a holiday
    expect(cy.isEasterMonday(DateTime.fromISO("2024-04-01"))).toBe(false);
  });
});
