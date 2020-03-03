import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FadeLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Exemplo: teste@teste.com')
    .required('*Digite um email'),
  password: Yup.string().required('*Digite uma senha'),
});

const override = css`
  display: flex;
  margin: auto;
  margin-top: 10px;
`;

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
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
        <FadeLoader css={override} color="#fff" loading={loading} />
      </Form>
    </>
  );
}
