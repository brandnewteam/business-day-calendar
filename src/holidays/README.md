# Holiday Matchers for business-day-calendar

This directory contains predefined holiday matchers for various countries and regions.

## Available Holiday Matchers

All 27 EU member states plus San Marino and the United States. Only statutory public holidays
(non-working days by law for the general workforce) are included; observances, bank-only days
and municipal holidays are left out. Names are in the official language of the country.

| Code | Country       | Language of names | Regions (`holidays.XX.regions`)                                                                                                                                                                  |
| ---- | ------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AT   | Austria       | German            | — (state patron-saint days are not statutory)                                                                                                                                                    |
| BE   | Belgium       | Dutch             | —                                                                                                                                                                                                |
| BG   | Bulgaria      | Bulgarian         | — (weekend substitution rule of art. 154(2) Labour Code is modelled from 2017)                                                                                                                   |
| CY   | Cyprus        | Greek             | —                                                                                                                                                                                                |
| CZ   | Czechia       | Czech             | —                                                                                                                                                                                                |
| DE   | Germany       | German            | 16 Länder: BW BY BE BB HB HH HE MV NI NW RP SL SN ST SH TH                                                                                                                                       |
| DK   | Denmark       | Danish            | — (Store Bededag until 2023)                                                                                                                                                                     |
| EE   | Estonia       | Estonian          | —                                                                                                                                                                                                |
| ES   | Spain         | Spanish           | 17 autonomous communities + CE, ML: AN AR AS CB CE CL CM CN CT EX GA IB MC MD ML NC PV RI VC (stable statutory rules only; the yearly decrees that move or substitute holidays are not modelled) |
| FI   | Finland       | Finnish           | —                                                                                                                                                                                                |
| FR   | France        | French            | Alsace-Moselle departments: 57 67 68                                                                                                                                                             |
| GR   | Greece        | Greek             | — (`statutory`: the 9 mandatory holidays; `all` adds Clean Monday, Good Friday and Whit Monday)                                                                                                  |
| HR   | Croatia       | Croatian          | —                                                                                                                                                                                                |
| HU   | Hungary       | Hungarian         | — (bridge days decreed yearly are not modelled)                                                                                                                                                  |
| IE   | Ireland       | English           | —                                                                                                                                                                                                |
| IT   | Italy         | Italian           | BZ (South Tyrol: Whit Monday); October 4 from 2026                                                                                                                                               |
| LT   | Lithuania     | Lithuanian        | —                                                                                                                                                                                                |
| LU   | Luxembourg    | French            | —                                                                                                                                                                                                |
| LV   | Latvia        | Latvian           | — (Monday off after a weekend May 4 / Nov 18 is modelled)                                                                                                                                        |
| MT   | Malta         | Maltese           | —                                                                                                                                                                                                |
| NL   | Netherlands   | Dutch             | — (Goede Vrijdag and Bevrijdingsdag are exported but not in `all`: they are not general days off)                                                                                                |
| PL   | Poland        | Polish            | — (Christmas Eve from 2025)                                                                                                                                                                      |
| PT   | Portugal      | Portuguese        | 20 (Azores), 30 (Madeira)                                                                                                                                                                        |
| RO   | Romania       | Romanian          | —                                                                                                                                                                                                |
| SE   | Sweden        | Swedish           | —                                                                                                                                                                                                |
| SI   | Slovenia      | Slovenian         | —                                                                                                                                                                                                |
| SK   | Slovakia      | Slovak            | — (Sept 1 and Nov 17 no longer days off from 2025; May 8 and Sept 15 suspended for 2026)                                                                                                         |
| SM   | San Marino    | Italian           | —                                                                                                                                                                                                |
| US   | United States | English           | — (`federal` and `all`)                                                                                                                                                                          |

Every predefined matcher carries a `holidayName` (set via `defineHoliday`), so it can be reported by `listHolidays`.
Holidays that were introduced or abolished at a known date are year-aware (e.g. `listHolidays(holidays.DK.all, 2023)` still contains Store Bededag).

## Utility Functions

### Easter Calculation

- `calculateEaster(year)`: Calculates the date of Easter Sunday for a given year using the Meeus/Jones/Butcher algorithm
- `calculateEasterMonday(year)`: Calculates the date of Easter Monday (day after Easter Sunday)

### Holiday Groups

Pre-defined groups of holidays, keyed by ISO 3166-1 alpha-2 code (see the table above):

- `holidays.XX.all`: the statutory nationwide holidays of country XX (e.g. `holidays.DE.all`)
- `holidays.XX.regions.YY`: nationwide + regional holidays of region YY, keyed by ISO 3166-2 code without the country prefix (e.g. `holidays.DE.regions.BY`, `holidays.ES.regions.CT`)
- `holidays.US.federal`: US federal holidays only; `holidays.US.all` adds common non-federal ones
- `holidays.GR.statutory`: the nine holidays mandatory for the whole Greek workforce; `holidays.GR.all` adds the customary ones

### Utility Functions

- `combineHolidays(...matcherSets)`: Combines multiple sets of holiday matchers into a single array
- `defineHoliday(name, matcher)`: Attaches a human-readable name to a holiday matcher
- `listHolidays(holidayMatchers, year)`: Lists the holidays of a year as `{ name, month, day }` objects, sorted by date
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
