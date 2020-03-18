import React from 'react';
import {Text} from 'react-native';

import Background from '~/components/Background';
import Input from '~/components/Input';

// import { Container } from './styles';

export default function SignIn() {
  return (
    <Background>
      <Text>SIGN SignIn</Text>

      <Input style={{marginTop: 30}} icon="heart" placeholder="piroca" />
    </Background>
  );
}
