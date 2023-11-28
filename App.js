// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ArtistDescriptionScreen from './DescriptionScreen';
import LastFmScreen from './LastFmScreen';
import SpotifyTest from './SpotifyTest';
import MusicPlayer from './MusicPlayerScreen';
import AboutMe from './AboutMeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="Musi-Play3" component={HomeScreen} />
        <Stack.Screen name="ArtistDescription" component={ArtistDescriptionScreen} />
        <Stack.Screen name="LastFm" component={LastFmScreen} />
        <Stack.Screen name="MusicPlayer" component={MusicPlayer} />
        <Stack.Screen name="SpotifyTest" component={SpotifyTest} />
        <Stack.Screen name="AboutMe" component={AboutMe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
