import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const AboutMe = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button title="BACK" onPress={() => navigation.goBack()} />
      <Text>About me: My name is Andy Huynh! I may not be good at makin apps, or I'm not putting enough time into it, but I'm here to try my best! Hope this app is useful in anyway. This app is supposed to let you use the LastFM API to see list of songs from the artist, then after it will allow you to see a short detail/summary about them. This app is also a way to play some music off of your local files.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AboutMe;
