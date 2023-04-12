import { parseISO, setYear } from "date-fns";

/***
 *
 * @param 2023-04-11
 * @returns Current year + 1
 */

export function getFutureDate(date: string): Date {
  return setYear(parseISO(date), new Date().getFullYear() + 1);
}
