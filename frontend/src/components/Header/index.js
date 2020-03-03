import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logoBlue.png';

import Notifications from '~/components/Notifications';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="DeskPoint" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Notifications />

          <Profile>
            <div>
              <strong>Larry Junior</strong>
              <Link to="/profile">Minha Conta</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/50/abott@adorable.png"
              alt="Foto Larry Junior"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
