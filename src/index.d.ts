import type { DateTime } from "luxon";
export type HolidayMatcher = (date: DateTime) => boolean;

export interface BusinessCalendarOptions {
  businessDays?: number[];
  holidayMatchers?: HolidayMatcher[];
}

/**
 * Creates a BusinessCalendar instance.
 */
declare function createBusinessCalendar(
  date?: DateTime,
  options?: BusinessCalendarOptions
): any; // You can replace `any` with the actual class/interface if you type it

export default createBusinessCalendar;
