import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Exemplo: teste@teste.com')
    .required('*Digite um email'),
  password: Yup.string().required('*Digite uma senha'),
});

export default function SignIn() {
  function handleSubmit(data) {
    // eslint-disable-next-line no-console
    console.log(data);
  }

  return (
    <>
      <img src={logo} alt="DeskPoint" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />

        <button type="submit">Acessar</button>
        <Link to="/register">Criar uma nova conta</Link>
      </Form>
    </>
  );
}
