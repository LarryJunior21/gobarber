import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Exemplo: teste@teste.com')
    .required('*Digite um email'),
  password: Yup.string().required('*Digite uma senha'),
});

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    // eslint-disable-next-line no-console
    dispatch(signInRequest(email, password));
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
