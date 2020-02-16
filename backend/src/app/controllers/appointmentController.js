import * as yup from 'yup';
import {
  startOfHour, parseISO, isBefore, format, subHours,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Appointment from '../models/Appointments';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notifications';

import Queue from '../../lib/Queue';
import CancelationMail from '../jobs/CancelationMail';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    // LISTA OS APPOINTMENTS
    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date', 'user_id', 'canceled_at', 'created_at', 'updated_at'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      provider_id: yup.number().required(),
      date: yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Validation fail appointment' });
    }

    const { provider_id, date } = req.body;

    /**
     * Chef if provider_id is a provider
     */
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res.status(401).json({ erro: 'User not a provider' });
    }

    /**
     * VERIFICA SE ELE ESTA TENTANDO FAZER APPOINTMENTS PARA ELE MESMO
     */
    if (req.userId === provider_id) {
      return res.status(401).json({ erro: 'Cant make self appointments' });
    }

    /**
     * VERIFICA SE A DATA É ANTERIOR A HOJE
     * */
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Date is past from today' });
    }

    /**
     * VERIFICA SE A DATA ESTA DISPONIVEL
    */
    const checkAvaibility = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvaibility) {
      return res.status(400).json({ error: 'Date already has an appointment' });
    }


    // SE PASSAR POR TUDO, É CRIADO UM APPOINTMENT
    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    /**
     * NOTIFICAR O PRESTADOR DE SERVIÇO
     */
    const user = await User.findByPk(req.userId);
    /**
     * FORMATANDO DATA
     * '' <- PARA INSERIR TEXTO NA FORMATAÇÃO
     * MMMM <- RETORNA O MES POR EXTENSO
     * locale: pt <- TRADUZ O MES POR EXTENSO PARA PORTUGUES
     * PRECISA DAR O IMPORT " import pt from 'date-fns/locale/pt' ";
     */
    const formatDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt },
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formatDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.user_id !== req.userId) {
      return res.status(401).json(
        { error: "You don't have permission to cancel" },
      );
    }

    const dateWithSub = subHours(appointment.date, 2);

    /**
     * EXEMPLO
     *  13:30
     *  dateWithSub: 11h
     *  now: 11:25h
     */

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel appointments 2 hours in advance',
      });
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    await Queue.add(CancelationMail.key, {
      appointment,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
