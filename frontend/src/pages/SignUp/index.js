import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';

export default function SignIn() {
  const schema = Yup.object().shape({
    name: Yup.string().required('*Digite seu nome'),
    email: Yup.string()
      .email('E-mail inválido, exemplo: teste@teste.com')
      .required('*Digite um email'),
    password: Yup.string()
      .min(6, '*A senha deve ter pelo menos 6 digitos/caracteres')
      .required('*Digite uma senha'),
  });

  function handleSubmit(data) {
    // eslint-disable-next-line no-console
    console.log(data);
  }

  return (
    <>
      <img src={logo} alt="DeskPoint" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Seu nome" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />

        <button type="submit">Cadastrar</button>
        <Link to="/">Já possui cadastro? Faça Login</Link>
      </Form>
    </>
  );
}
