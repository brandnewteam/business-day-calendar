# Business Day Calendar

## Description

Business Calendar is a JavaScript library that provides functionality for handling business days using Luxon. It serves as a wrapper around Luxon to simplify the management of business days, including calculations and date manipulations.

## Installation

To install the package, use npm:

```
npm install business-day-calendar luxon
```

**NB:** Luxon is a peer dependency, so you need to have it as well.

## Usage

To use the Business Calendar library, import it in your JavaScript code:
CommonJS:

```javascript
const createBusinessDayCalendar = require("business-day-calendar");
```

ESM:

```javascript
import createBusinessDayCalendar from "business-day-calendar";
import { DateTime } from "luxon";

const now = createBusinessDayCalendar(DateTime.now(), {
  businessDays: [1, 2, 3, 4], // Monday to Thursday
});
```

You can then create an instance of the `BusinessDayCalendar` and use its methods to perform operations related to business days.

## API

### `createBusinessDayCalendar(date: DateTime, options?: CreateOptions): BusinessDayCalendar`

Creates a new business calendar instance for the given date.

- `date`: A Luxon `DateTime` object.
- `options` (optional): An object with:
  - `businessDays` (number[]): ISO weekday numbers (1=Monday ... 7=Sunday). Defaults to `[1,2,3,4,5]`.
  - `holidayMatchers` (function[]): Array of functions `(date: DateTime) => boolean` to mark holidays.

Returns: `BusinessDayCalendar` instance.

---

### `BusinessDayCalendar#diffBusinessDays(otherDateTime: DateTime, options?: { excludeStartingDay?: boolean }): Duration`

Counts the number of business days between the current instance and another date.

- `otherDateTime`: A Luxon `DateTime` object to compare to.
- `options` (optional):
  - `excludeStartingDay` (boolean): If true, excludes the starting day if it is a business day. Defaults to `false`.

Returns: Luxon `Duration` object representing the difference in business days. **Note:** the `Duration` is normalized to days, but can converted for example to weeks with `.as('weeks')`.

## Contributing

Contributions are welcome! Please open an [issue](https://github.com/brandnewteam/business-day-calendar/issues) or submit a [pull request](https://github.com/brandnewteam/business-day-calendar/pulls).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
