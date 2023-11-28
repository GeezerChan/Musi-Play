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
        title="Music Player"
        onPress={() => navigation.navigate('MusicPlayer')}
        style={{ marginVertical: 20 }}
      />

      {/* <Button
        title="Spotify Token Test"
        onPress={() => navigation.navigate('SpotifyTest')}
        style={{ marginVertical: 20 }}
      /> */}
      <Button
        title="About Me"
        onPress={() => navigation.navigate('AboutMe')}
        style={{ marginVertical: 20 }} // Add spacing above the button
      />
    </View>
  );
};

export default HomeScreen;
