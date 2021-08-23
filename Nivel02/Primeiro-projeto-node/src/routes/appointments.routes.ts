import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

// models
import Appointment from '../models/appointments';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.get('/', (request, response) => {
  return response.json({ appointments });
});
appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ error: 'this appointment is already booked.' });
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return response.json(appointment);
});
appointmentsRouter.put('/:id', (request, response) => {
  return response.json({ message: 'temp' });
});
appointmentsRouter.delete('/:id', (request, response) => {
  return response.json({ message: 'temp' });
});

export default appointmentsRouter;
