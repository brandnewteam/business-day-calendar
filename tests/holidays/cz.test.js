import { describe, it, expect } from "vitest";
import * as cz from "../../src/holidays/countries/cz.js";
import { listHolidays } from "../../src/holidays/index.js";

describe("Czech Holidays", () => {
  it("should list the 2026 nationwide holidays", () => {
    expect(listHolidays(cz.getHolidays(), 2026)).toEqual([
      { name: "Nový rok", month: 1, day: 1 },
      { name: "Velký pátek", month: 4, day: 3 },
      { name: "Velikonoční pondělí", month: 4, day: 6 },
      { name: "Svátek práce", month: 5, day: 1 },
      { name: "Den vítězství", month: 5, day: 8 },
      {
        name: "Den slovanských věrozvěstů Cyrila a Metoděje",
        month: 7,
        day: 5,
      },
      { name: "Den upálení mistra Jana Husa", month: 7, day: 6 },
      { name: "Den české státnosti", month: 9, day: 28 },
      {
        name: "Den vzniku samostatného československého státu",
        month: 10,
        day: 28,
      },
      { name: "Den boje za svobodu a demokracii", month: 11, day: 17 },
      { name: "Štědrý den", month: 12, day: 24 },
      { name: "1. svátek vánoční", month: 12, day: 25 },
      { name: "2. svátek vánoční", month: 12, day: 26 },
    ]);
  });

  it("should treat Good Friday as a holiday only from 2016", () => {
    const names2015 = listHolidays(cz.getHolidays(), 2015).map((h) => h.name);
    expect(names2015).not.toContain("Velký pátek");
    expect(names2015).toHaveLength(12);

    const list2016 = listHolidays(cz.getHolidays(), 2016);
    expect(list2016).toContainEqual({ name: "Velký pátek", month: 3, day: 25 });
    expect(list2016).toHaveLength(13);
  });
});
