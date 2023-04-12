import { describe, expect, it } from "vitest";
import { getFutureDate } from "../../tests/utils/get-future-date";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentRepository } from "../repositories/in-memory/in-memory-appointment";
import { CreateAppointment } from "./create-appointment";

describe("", () => {
  it("should be able to create an appointment", async () => {
    const startsAt = getFutureDate("2023-04-11");
    const endsAt = getFutureDate("2023-04-12");

    const appointmentRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);
    // devido ao caso de uso ser uma promise, usar o resolves
    expect(
      createAppointment.execute({
        customer: "Joao Paulo",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should not be able to create an appointment with overlapping dates", async () => {
    const startsAt = getFutureDate("2023-04-11");
    const endsAt = getFutureDate("2023-04-15");

    const appointmentRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);
    // devido ao caso de uso ser uma promise, usar o resolves
    await createAppointment.execute({
      customer: "Joao Paulo",
      startsAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        customer: "Zezim",
        startsAt: getFutureDate("2023-04-12"),
        endsAt: getFutureDate("2023-04-13"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "Zezim",
        startsAt: getFutureDate("2023-04-10"),
        endsAt: getFutureDate("2023-04-13"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "Zezim",
        startsAt: getFutureDate("2023-04-10"),
        endsAt: getFutureDate("2023-04-17"),
      })
    ).rejects.toBeInstanceOf(Error);
    expect(
      createAppointment.execute({
        customer: "Zezim",
        startsAt: getFutureDate("2023-04-11"),
        endsAt: getFutureDate("2023-04-12"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
