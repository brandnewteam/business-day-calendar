/**
 * Calculates Easter Sunday for a given year using the Meeus/Jones/Butcher algorithm.
 * Returns an object with the month and day of Easter Sunday.
 *
 * @param {number} year - The year for which to calculate Easter Sunday
 * @returns {{ year: number, month: number, day: number }} - Object with year, month (1-12), and day
 */
export function calculateEaster(year) {
  // Algorithm from Astronomical Algorithms by Jean Meeus
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return { year, month, day };
}

/**
 * Calculates Easter Monday for a given year, which is the day after Easter Sunday.
 *
 * @param {number} year - The year for which to calculate Easter Monday
 * @returns {{ year: number, month: number, day: number }} - Object with year, month (1-12), and day
 */
export function calculateEasterMonday(year) {
  const easterSunday = calculateEaster(year);
  let day = easterSunday.day + 1;
  let month = easterSunday.month;

  // Handle month rollover if Easter is on the 31st
  if ((month === 3 && day > 31) || (month === 4 && day > 30)) {
    day = 1;
    month += 1;
  }

  return { year, month, day };
}
