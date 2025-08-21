# Business Day Calendar

## Description

A JavaScript library that provides functionality for handling business days using Luxon. It serves as a wrapper around Luxon to simplify the management of business days, including calculations and date manipulations.

## Installation

To install the package using npm:

```
npm install business-day-calendar luxon
```

**NB:** Luxon is a peer dependency, so you need to have it installed as well.

## Usage

To use the Business Calendar library, import it in your JavaScript code:
CommonJS:

```javascript
const { createBusinessCalendar } = require("business-day-calendar");
```

ESM:

```javascript
import { createBusinessCalendar } from "business-day-calendar";
import { DateTime } from "luxon";

const businessCalendar = createBusinessCalendar({
  weekendDays: [5, 6], // Custom weekend: Friday to Saturday
});

const today = businessCalendar(DateTime.now()); // BusinessDateTime & DateTime
```

A Business Calendar allows you to create `BusinessDateTime` objects that inherit the weekend and holidays set in the calendar. These objects are Luxon `DateTime` object with additional methods to perform operations related to business days.

## API

### `createBusinessCalendar(options?: CreationOptions): (DateTime) => BusinessDateTime`

Creates a new Business Calendar instance with the given options (weekend days and holidays).

- `options` (optional): An object with:
  - `weekendDays` (number[]): ISO weekday numbers (1=Monday ... 7=Sunday). Defaults to `[6, 7]` (Saturday and Sunday).
  - `holidayMatchers` (function[]): An array of functions `(date: DateTime) => boolean` to mark holidays. See the [Holiday Matchers](#holiday-matchers) section for predefined holiday matchers.

Returns: a `BusinessDateTime` factory function.

---

### `BusinessDateTime#isBusinessDay(): boolean`

Returns true if this DateTime is on a business day.

---

### `BusinessDateTime#isHoliday(): boolean`

Returns true if this DateTime falls on a holiday, i.e. at least one of the `holidayMatchers` returns `true`.

---

### `BusinessDateTime#diffBusinessDays(otherDateTime: DateTime, options?: { excludeStartingDay?: boolean }): Duration`

Counts the number of business days between the current instance and another date. Normally, the starting day is counted, but the end day is not. This way, there is one business day between today and tomorrow. Optionally, the starting day can be excluded from the count, resulting in an excluding range between two `DateTime`s being counted.

- `otherDateTime`: A Luxon `DateTime` object to compare to.
- `options` (optional):
  - `excludeStartingDay` (boolean): If true, excludes the starting day if it is a business day. Defaults to `false`.

Returns: Luxon `Duration` object representing the difference in business days. **Note:** the `Duration` is normalized to days, but can converted for example to weeks with `.as('weeks')`.

---

### `BusinessDateTime#plusBusiness(Duration): BusinessDateTime`

Add a period of time to this `DateTime` and return the resulting `BusinessDateTime`. Any weekend days and holidays are skipped.

---

### `BusinessDateTime#minusBusiness(Duration): BusinessDateTime`

Subtract a period of time to this `DateTime` and return the resulting `BusinessDateTime`. Any weekend days and holidays are skipped.

## Holiday Matchers

The library comes with predefined holiday matchers for different countries and regions. These can be used to easily mark holidays in your business calendar.

### Available Holiday Groups

- US Federal Holidays: `holidayGroups.US.federal`
- All US Holidays: `holidayGroups.US.all` (includes non-federal holidays)
- Italian Holidays: `holidayGroups.IT.all`
- San Marino Holidays: `holidayGroups.SM.all`

### Example Usage

```javascript
import { DateTime } from "luxon";
import { create, holidayGroups } from "business-day-calendar";

// Create a calendar with US federal holidays
const usCalendar = create(DateTime.now(), {
  holidayMatchers: holidayGroups.US.federal,
});

// Create a calendar with both Italian and Sammarinese holidays
const combinedCalendar = create(DateTime.now(), {
  holidayMatchers: [...holidayGroups.IT.all, ...holidayGroups.SM.all],
});

// Use weekend-adjusted holidays (if a holiday falls on weekend, it's observed on Friday or Monday)
import { getWeekendAdjustedHolidays } from "business-day-calendar";
const adjustedCalendar = create(DateTime.now(), {
  holidayMatchers: getWeekendAdjustedHolidays(holidayGroups.US.federal),
});
```

### Easter Calculation

The library includes functions to calculate Easter Sunday and Easter Monday for any given year:

```javascript
import { calculateEaster, calculateEasterMonday } from "business-day-calendar";

const easter2025 = calculateEaster(2025); // { year: 2025, month: 4, day: 20 }
const easterMonday2025 = calculateEasterMonday(2025); // { year: 2025, month: 4, day: 21 }
```

For more details, see the [Holiday Matchers Documentation](src/holidays/README.md).

## Contributing

Contributions are welcome! Please open an [issue](https://github.com/brandnewteam/business-day-calendar/issues) or submit a [pull request](https://github.com/brandnewteam/business-day-calendar/pulls).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
