import React, { memo } from 'react';
import Background from './components/Background';
import Logo from './components/Logo';
import Header from './components/Header';
import Button from './components/Button';
import Paragraph from './components/Paragraph';

const HomeScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>42 Snaps</Header>

    <Paragraph>
      Are you ready?
    </Paragraph>
        <Button mode="contained" onPress={() => navigation.navigate('')}>
      Start!
    </Button>
    <Button mode="outlined" onPress={() => navigation.navigate('')}>
      Create new room
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('')}
    >
      Join a room
    </Button>
  </Background>
);

export default memo(HomeScreen);