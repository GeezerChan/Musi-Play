import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AboutMe = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>BACK</Text>
      </TouchableOpacity>
      <Text style={styles.aboutText}>
        About me: My name is Andy Huynh! I may not be good at making apps, or I'm not putting
        enough time into it, but I'm here to try my best! Hope this app is useful in any way.
        This app is supposed to let you use the LastFM API to see a list of songs from the
        artist, then after it will allow you to see a short detail/summary about them. This app
        is also a way to play some music off of your local files.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'silver',
    padding: 20,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  aboutText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default AboutMe;
