import { Appointment } from "../entities/appointment";
import { IAppointmentRepository } from "../repositories/appointment-repository";

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentRepo: IAppointmentRepository) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt,
    });
    const overLappingAppointment =
      await this.appointmentRepo.findOverlappingAppointment(startsAt, endsAt);

    if (overLappingAppointment) {
      throw new Error("Another appointment overlaps this appointment date");
    }

    await this.appointmentRepo.create(appointment);
    return appointment;
  }
}
