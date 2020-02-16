import {
  startOfDay,
  endOfDay,
  setSeconds,
  setMinutes,
  setHours,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointments';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'invalid date' });
    }

    const searchDate = Number(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    const schedule = [];

    for (let i = 8; i < 20; i += 1) {
      if (i < 10) {
        schedule.push(`0${i}:00`);
      } else {
        schedule.push(`${i}:00`);
      }
    }

    const available = schedule.map((time) => {
      const [hour, minute] = time.split(':');
      const value = setSeconds(setMinutes(setHours(searchDate, hour), minute), 0);

      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          isAfter(value, new Date())
          && !appointments.find((a) => format(a.date, 'HH:mm') === time),
      };
    });

    return res.json(available);
  }
}

export default new AvailableController();
