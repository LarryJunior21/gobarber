import jwt from 'jsonwebtoken';
import * as yup from 'yup';

import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    // VALIDA ACESSO DO USUARIO EMAIL E SENHA
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });
    // SE NAO É VALIDO RETORNA ERRO
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fail' });
    }

    const { email, password } = req.body;

    // BUSCA O USUARIO
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    // SE EXISTE UM USUARIO COM O EMAIL ELE RETORNA ERRO
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // VERIFICA A SENHA
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const {
      id, name, avatar, provider,
    } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        provider,
        avatar,
      },
      // GERA O TOKEN
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
