import { areIntervalsOverlapping } from "date-fns";
import { Appointment } from "../../entities/appointment";
import { IAppointmentRepository } from "../appointment-repository";

export class InMemoryAppointmentRepository implements IAppointmentRepository {
  items: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }
  async findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | null> {
    const overLappingAppointment = this.items.find((appointment) => {
      return areIntervalsOverlapping(
        { start: startsAt, end: endsAt },
        { start: appointment.startsAt, end: appointment.endsAt },
        { inclusive: true } // inclusive vai utilizar o menor ou igual, se for false, vai utilizar o operador menor apenas
        // o que vai quebrar os testes que ja estao funcionando, como a condicional no constructor da Appointment
      );
    });

    if (!overLappingAppointment) {
      return null;
    }
    return overLappingAppointment;
  }
}
