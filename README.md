# Business Day Calendar

[![Build and Test in Node.js](https://github.com/brandnewteam/business-day-calendar/actions/workflows/built-and-test.yml/badge.svg)](https://github.com/brandnewteam/business-day-calendar/actions/workflows/built-and-test.yml)

## Description

A JavaScript library that provides functionality for handling business days using Luxon. It serves as a wrapper around Luxon to simplify the management of business days, including calculations and date manipulations.

## Installation

To install the package using npm:

```
npm install business-day-calendar luxon
```

**NB:** Luxon is a peer dependency, so you need to have it installed as well.

## Usage

CommonJS:

```javascript
const { createBusinessCalendar } = require("business-day-calendar");
```

ESM:

```javascript
import { createBusinessCalendar } from "business-day-calendar";
import { DateTime } from "luxon";

const businessCalendar = createBusinessCalendar({
  holidayMatchers: [
    (date) => date.month === 1 && date.day === 1,
    (date) => date.month === 12 && date.day === 25,
  ],
});

const today = businessCalendar(DateTime.now()); // BusinessDateTime & DateTime
```

A Business Calendar allows you to create `BusinessDateTime` objects that inherit the weekend and holidays set in that calendar. These objects are Luxon `DateTime` objects with additional methods to perform operations related to business days.

## Setting the Locale

You can set the locale globally for all Luxon DateTime objects:

```javascript
import { Settings } from "luxon";
Settings.defaultLocale = "it"; // Set default locale to Italian
```

Or set the locale on an individual DateTime object:

```javascript
import { DateTime } from "luxon";
const dt = DateTime.now().setLocale("fr"); // Set locale to French for this DateTime only
```

The **locale** defines which days are considered part of the **weekend**, and will be used to determine business days unless overridden at Calendar creation.

## API

### `createBusinessCalendar(options?: CreationOptions): (DateTime) => BusinessDateTime`

Creates a new Business Calendar instance with the given options:

- `options` (optional):
  - `holidayMatchers` (function[]): An array of functions `(date: DateTime) => boolean` to mark holidays. See the [Holiday Matchers](#holiday-matchers) section for predefined holiday matchers.
  - `weekendDays` (number[]): ISO weekday numbers (1=Monday ... 7=Sunday). By default, weekend days are inferred from the current locale (either the Luxon global default locale or the locale set on the DateTime you pass in). Use this option **only** to override the weekend days derived from the locale. If not specified, the locale's weekend days are used.

Returns: a `BusinessDateTime` factory function, a Business Calendar.

---

### `BusinessDateTime#isBusinessDay(): boolean`

Returns true if this DateTime is on a business day.

---

### `BusinessDateTime#isHoliday(): boolean`

Returns true if this DateTime is on a holiday, i.e. at least one of the `holidayMatchers` returns `true`.

---

### `BusinessDateTime#diffBusinessDays(otherDateTime: DateTime, options?: { excludeStartingDay?: boolean }): Duration`

Counts the number of business days between the current instance and another `DateTime`. Normally, the starting day is counted, but the end day is not. This way, there is one business day between today and tomorrow. Optionally, the starting day can be excluded from the count, resulting in an excluding range between two `DateTime`.

- `otherDateTime`: A Luxon `DateTime` object to compare to.
- `options` (optional):
  - `excludeStartingDay` (boolean): If `true`, excludes the starting day even if it is a business day. Defaults to `false`.

Returns: Luxon `Duration` object representing the difference in business days. **Note:** the `Duration` is normalized to days, but can converted for example to weeks with `.as('weeks')`.

---

### `BusinessDateTime#plusBusiness(Duration): BusinessDateTime`

Add a period of time to this `DateTime` and return the resulting `BusinessDateTime`. Any weekend days and holidays are skipped.

---

### `BusinessDateTime#minusBusiness(Duration): BusinessDateTime`

Subtract a period of time to this `DateTime` and return the resulting `BusinessDateTime`. Any weekend days and holidays are skipped. `Duration` should be positive.

## Holiday Matchers

The library comes with predefined holiday matchers for different countries and regions. These can be used to easily mark holidays in your business calendar.

### Available Holiday Groups

For more details, see the [Holiday Documentation](src/holidays/README.md).

### Example Usage

```javascript
import { DateTime } from "luxon";
import {
  createBusinessCalendar,
  holidays,
  combineHolidays,
  getWeekendAdjustedHolidays,
} from "business-day-calendar";

// Create a calendar with US federal holidays
const usCalendar = createBusinessCalendar({
  holidayMatchers: holidays.US.federal,
});

// Use weekend-adjusted holidays (if a holiday falls on weekend, it's observed on Friday or Monday)
import { getWeekendAdjustedHolidays } from "business-day-calendar";
const adjustedCalendar = createBusinessCalendar({
  holidayMatchers: getWeekendAdjustedHolidays(holidays.US.federal),
});

// Create a calendar with both Italian and Sammarinese holidays
const combinedCalendar = createBusinessCalendar({
  holidayMatchers: combineHolidays(holidays.IT.all, holidays.SM.all),
});
```

## Contributing

Contributions are welcome! Please open an [issue](https://github.com/brandnewteam/business-day-calendar/issues) or submit a [pull request](https://github.com/brandnewteam/business-day-calendar/pulls).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
