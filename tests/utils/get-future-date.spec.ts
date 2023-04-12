import { expect, test } from "vitest";
import { getFutureDate } from "./get-future-date";

test("it should increase the current date with plus one year", async () => {
  const currentDatePlusOne = new Date().getFullYear() + 1;
  const currentYear = new Date().getFullYear();
  expect(getFutureDate(`${currentYear}-04-11`).getFullYear()).toEqual(
    currentDatePlusOne
  );
});
