import User from '../models/User';
import * as yup from 'yup';

class UserController {
  async store(req, res) {
    //VALIDA O CADASTRO DE USUARIO
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(6),
    });
    //SE NÃO ESTÁ VALIDO RETORNA ERRO
    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fail'});
    }
    //BUSCA O USUARIO PELO EMAIL
    const userExists = await User.findOne({
      where: { email: req.body.email }
    });
    //VERIFICA SE O USUARIO JÁ EXISTE
    if(userExists){
      return res.status(400).json({ error: 'User Existe >:('});
    }

    const user = await User.create(req.body);
    //RETORNO DE RESPOSTA DO USUARIO CRIADO
    return res.json(user);
  }

  async update(req, res) {
    //VALIDA OS CAMPOS DE UPDATE DO USUARIO REQUISITANDO A SENHA ANTIGA CASO QUEIRA ALTERAR A SENHA
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      oldPassword: yup.string().min(6),
      password: yup.string().min(6).when('oldPassword',
        (oldPassword, field) => oldPassword ? field.required() : field),
      confirmPassword: yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([yup.ref('password')]) : field)
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fail'});
    }

    const { email, oldPassword } = req.body;
    //BUSCA USUARIO PELO ID
    const user = await User.findByPk(req.userId);
    //VERIFICA SE QUER MUDAR O EMAIL E SE O EMAIL ALTERADO JA EXISTE
    if(email && email !== user.email){
      const userExists = await User.findOne({
        where: { email }
      });

      if(userExists){
        return res.status(400).json({ error: 'User Existe >:('});
      }
    }
    //VERIFICA SE QUER MUDAR A SENHA E CHECA SE A SENHA ANTIGA É VALIDA
    if(oldPassword && !(await user.checkPassword(oldPassword))){
      return res.status(401).json({ error: 'Pwd does not match'});
    }

    const usr = await user.update(req.body);
    //SE DEU TUDO CERTO RETORNA O USUARIO ALTERADO
    return res.json(usr);
  }
}

export default new UserController;
