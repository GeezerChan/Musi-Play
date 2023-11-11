// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ArtistDescriptionScreen from './DescriptionScreen';
import LastFmScreen from './LastFmScreen';
import SpotifyTest from './SpotifyTest';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ArtistDescription" component={ArtistDescriptionScreen} />
        <Stack.Screen name="LastFm" component={LastFmScreen} />
        <Stack.Screen name="SpotifyTest" component={SpotifyTest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
