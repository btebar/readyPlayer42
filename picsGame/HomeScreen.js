import React, { memo } from 'react';
import {Text} from 'react-native';
import Background from './components/Background';
import Logo from './components/Logo';
import Header from './components/Header';
import Button from './components/Button';
import Paragraph from './components/Paragraph';
import {newRoom, joinRoom} from '../Server';

const joinRoomApi = () => {
  joinRoom(13177, "Charlie");
}

const newRoomApi = () => {
  newRoom("Blanca");
}

const HomeScreen = ({ navigation }) => (
  <Background >
    <Logo />
    <Header> <Text style={{fontFamily: 'Hoefler Text'}}> 42 Snaps</Text></Header>

    <Paragraph>
      Are you ready?
    </Paragraph>
        <Button style={{backgroundColor: "#6495ed"}} mode="contained" onPress={() => navigation.navigate('42 Snaps')}>
      Start!
    </Button>
    <Button mode="outlined" onPress={() => newRoomApi()}>
      Create new room
    </Button>
    <Button
      mode="outlined"
      onPress={() => joinRoomApi()}
    >
      Join a room
    </Button>
  </Background>
);

export default memo(HomeScreen);