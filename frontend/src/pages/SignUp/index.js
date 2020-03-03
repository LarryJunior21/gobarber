import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FadeLoader } from 'react-spinners';
import { css } from '@emotion/core';

import logo from '~/assets/logo.png';

import { signUpRequest } from '~/store/modules/auth/actions';

const override = css`
  display: flex;
  margin: auto;
  margin-top: 10px;
`;

export default function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const schema = Yup.object().shape({
    name: Yup.string().required('*Digite seu nome'),
    email: Yup.string()
      .email('E-mail inválido, exemplo: teste@teste.com')
      .required('*Digite um email'),
    password: Yup.string()
      .min(6, '*A senha deve ter pelo menos 6 digitos/caracteres')
      .required('*Digite uma senha'),
  });

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
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
        <FadeLoader css={override} color="#fff" loading={loading} />
      </Form>
    </>
  );
}
