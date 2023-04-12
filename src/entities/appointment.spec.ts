import { expect, test } from "vitest";
import { getFutureDate } from "../../tests/utils/get-future-date";
import { Appointment } from "./appointment";

test("creat an appointment", async () => {
  const startsAt = getFutureDate("2023-04-11");
  const endsAt = getFutureDate("2023-04-12");

  const appointment = new Appointment({
    customer: "Ze das Cove",
    startsAt,
    endsAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("Ze das Cove");
});

test("cannot create an appointment with start date grater than ends date", async () => {
  const startsAt = getFutureDate("2023-04-11");
  const endsAt = getFutureDate("2023-04-09");

  expect(() => {
    return new Appointment({
      customer: "Ze das Cove",
      startsAt,
      endsAt,
    });
  }).toThrow();
});

test("cannot create an appointment with start date before current time", async () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setDate(startsAt.getDate() + 1);
  endsAt.setDate(endsAt.getDate() - 2);

  expect(() => {
    return new Appointment({
      customer: "Ze das Cove",
      startsAt,
      endsAt,
    });
  }).toThrow();
});
