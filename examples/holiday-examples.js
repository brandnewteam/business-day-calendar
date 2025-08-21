import { DateTime } from "luxon";
import {
  createBusinessCalendar,
  holidays,
  combineHolidays,
  getWeekendAdjustedHolidays,
  calculateEaster,
  calculateEasterMonday,
} from "../src/index.js";

// Example: Create a calendar for 2025 with US holidays
console.log("US Federal Holidays in 2025:");
const usCalendar = createBusinessCalendar({
  holidayMatchers: holidays.US.federal,
});

// Check each day of the year for holidays
for (let i = 0; i < 365; i++) {
  const date = usCalendar(DateTime.fromISO("2025-01-01")).plus({ days: i });
  if (!date.isBusinessDay()) {
    if (date.isHoliday()) {
      console.log(`${date.toLocaleString(DateTime.DATE_FULL)} is a holiday`);
    } else {
      console.log(`${date.toLocaleString(DateTime.DATE_FULL)} is a weekend`);
    }
  }
}

// Example: Create weekend-adjusted holidays calendar (if holiday falls on weekend, observe on closest weekday)
console.log("\nWeekend-adjusted US Federal Holidays in 2025:");
const weekendAdjustedHolidays = getWeekendAdjustedHolidays(holidays.US.federal);
const adjustedCalendar = createBusinessCalendar({
  holidayMatchers: weekendAdjustedHolidays,
});

const holidaysToCheck = [
  "2025-01-01", // New Year's Day (Wednesday)
  "2025-07-04", // Independence Day (Friday)
  "2025-11-11", // Veterans Day (Tuesday)
  // Example weekend holidays that would be observed on weekdays
  "2026-07-03", // July 3rd (Independence Day observed on Friday)
  "2027-07-05", // July 5th (Independence Day observed on Monday)
];

for (const dateStr of holidaysToCheck) {
  const dateObj = DateTime.fromISO(dateStr);
  const date = adjustedCalendar(dateObj);
  console.log(
    `${date.toLocaleString(
      DateTime.DATE_FULL
    )} is a business day: ${date.isBusinessDay()}`
  );
}

// Example: Create a calendar with multiple countries' holidays
console.log("\nCombined Italian and San Marino Holidays in 2025:");
const combinedCalendar = createBusinessCalendar({
  holidayMatchers: combineHolidays(holidays.IT.all, holidays.SM.all),
});

// Check specific important dates
const importantDates = [
  "2025-01-01", // New Year's Day
  "2025-01-06", // Epiphany
  "2025-04-21", // Easter Monday (calculated)
  "2025-06-02", // Italy's Republic Day
  "2025-08-15", // Ferragosto
  "2025-09-03", // San Marino Republic Day
  "2025-11-01", // All Saints' Day
  "2025-11-02", // All Souls' Day
  "2025-12-25", // Christmas
  "2025-12-26", // St. Stephen's Day
];

for (const dateStr of importantDates) {
  const dateObj = DateTime.fromISO(dateStr);
  const date = combinedCalendar(dateObj);
  console.log(
    `${date.toLocaleString(
      DateTime.DATE_FULL
    )} is a business day: ${date.isBusinessDay()}`
  );
}

// Example: Calculate Easter and Easter Monday for 2025
console.log("\nEaster Calculation Example for 2025:");
const easter2025 = calculateEaster(2025);
const dtEaster2025 = DateTime.fromObject({
  year: easter2025.year,
  month: easter2025.month,
  day: easter2025.day,
});
console.log(`Easter Sunday 2025: ${dtEaster2025.toFormat("yyyy-MM-dd")}`);

const easterMonday2025 = calculateEasterMonday(2025);
const dtEasterMonday2025 = DateTime.fromObject({
  year: easterMonday2025.year,
  month: easterMonday2025.month,
  day: easterMonday2025.day,
});
console.log(`Easter Monday 2025: ${dtEasterMonday2025.toFormat("yyyy-MM-dd")}`);

// Example: Show San Marino specific holidays
console.log("\nSan Marino Holidays in 2025:");
const sanMarinoCalendar = createBusinessCalendar({
  holidayMatchers: holidays.SM.all,
});

// Calculate Corpus Domini (60 days after Easter)
const easter = calculateEaster(2025);
const corpusDomini = DateTime.fromObject({
  year: easter.year,
  month: easter.month,
  day: easter.day,
}).plus({ days: 60 });

// Check specific San Marino holidays
const sanMarinoHolidaysToCheck = [
  "2025-02-05", // Saint Agatha's Day
  "2025-03-25", // Anniversary of the Arengo
  corpusDomini.toFormat("yyyy-MM-dd"), // Corpus Domini
  "2025-07-28", // Freedom Day
  "2025-09-03", // Foundation of the Republic
  "2025-11-02", // All Souls' Day
];

for (const dateStr of sanMarinoHolidaysToCheck) {
  const dateObj = DateTime.fromISO(dateStr);
  const date = sanMarinoCalendar(dateObj);
  console.log(
    `${date.toLocaleString(
      DateTime.DATE_FULL
    )} is a business day: ${date.isBusinessDay()}`
  );
}

console.log(
  `\nCorpus Domini 2025: ${corpusDomini.toLocaleString(DateTime.DATE_FULL)}`
);
