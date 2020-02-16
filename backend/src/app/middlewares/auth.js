import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // VARIÁVEL DE VERIFICAÇÃO, RECEBE UM TOKEN
  const authHeader = req.headers.authorization;
  // SE O TOKEN NÃO VEIO NO HEADER RETORNA UM ERRO
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }
  // PEGA APENAS O TOKEN DO HEADER
  const [, token] = authHeader.split(' ');

  try {
    // PEGA O USUARIO DE ACORDO COM O TOKEN QUE VEIO DA REQUISIÇÃO
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // DEFINE UMA VARIÁVEL DE ID
    req.userId = decoded.id;
    // PROSSEGUE COM AS ROTAS
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
