import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Go to Last.fm Screen"
        onPress={() => navigation.navigate('LastFm')}
        style={{ marginVertical: 20 }} // Add spacing above the button
      />

      <Button
        title="Spotify Token Test"
        onPress={() => navigation.navigate('SpotifyTest')}
        style={{ marginVertical: 20 }}
      />
    </View>
  );
};

export default HomeScreen;
