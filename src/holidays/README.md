# Holiday Matchers for business-day-calendar

This directory contains predefined holiday matchers for various countries and regions.

## Available Holiday Matchers

- Italy
- San Marino
- United States

## Utility Functions

### Easter Calculation

- `calculateEaster(year)`: Calculates the date of Easter Sunday for a given year using the Meeus/Jones/Butcher algorithm
- `calculateEasterMonday(year)`: Calculates the date of Easter Monday (day after Easter Sunday)

### Holiday Groups

Pre-defined groups of holidays:

- `holidays.IT.all`: All Italian holidays
- `holidays.SM.all`: All Sammarinese holidays
- `holidays.US.all`: All US holidays including non-federal ones
- `holidays.US.federal`: All US federal holidays

### Utility Functions

- `combineHolidays(...matcherSets)`: Combines multiple sets of holiday matchers into a single array
- `adjustWeekendHolidayMatchers(holidayMatcher)`: Creates a matcher that handles weekend-adjusted holidays (i.e. if a holiday falls on a weekend, it moves to Friday or Monday)
- `getWeekendAdjustedHolidays(holidayMatchers)`: Applies weekend adjustment to an array of holiday matchers

### Easter Calculation

The library includes functions to calculate Easter Sunday and Easter Monday for any given year:

```javascript
import { calculateEaster, calculateEasterMonday } from "business-day-calendar";

const easter2025 = calculateEaster(2025); // { year: 2025, month: 4, day: 20 }
const easterMonday2025 = calculateEasterMonday(2025); // { year: 2025, month: 4, day: 21 }
```

For more details, see the [Holiday Matchers Documentation](src/holidays/README.md).

## Usage Examples

```javascript
import { DateTime } from "luxon";
import {
  createBusinessCalendar,
  holidays,
  getWeekendAdjustedHolidays,
  combineHolidays,
} from "business-day-calendar";

// Create a calendar with US federal holidays
const usCalendar = createBusinessCalendar({
  holidayMatchers: holidays.US.federal,
});

// Create a calendar with weekend-adjusted holidays
const weekendAdjustedHolidays = getWeekendAdjustedHolidays(holidays.US.federal);
const weekendAdjustedCalendar = createBusinessCalendar({
  holidayMatchers: weekendAdjustedHolidays,
});

// Create a calendar with multiple countries holidays
const combinedCalendar = createBusinessCalendar({
  holidayMatchers: combineHolidays(holidays.IT.all, holidays.SM.all),
});
```
