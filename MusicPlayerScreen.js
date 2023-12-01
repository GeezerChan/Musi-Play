import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';

const MusicPlayer = ({ navigation }) => {
  const [showPermissionDenied, setShowPermissionDenied] = useState(false);

  // Enable playback in silence mode
  Sound.setCategory('Playback');

  const audioFiles = [
    require('./assets/_Nisekoi_OST_1_mp3.wav'),
    require('./assets/_Nisekoi_OST_2_mp3.wav'),
    require('./assets/_Nisekoi_OST_3_mp3.wav'),
    require('./assets/_Nisekoi_OST_5_mp3.wav'),
    require('./assets/Grimgar_Ost.mp3'),
  ];

  const sounds = audioFiles.map((audioFile, index) => new Sound(audioFile, (error) => {
    if (error) {
      console.error(`Failed to load sound ${index + 1}`, error);
      setShowPermissionDenied(true);
    }
  }));

  const playMusic = (index) => {
    console.log(`Playing music ${index + 1}`);
    sounds[index].play((success) => {
      if (success) {
        console.log(`Music ${index + 1} playback successful`);
      } else {
        console.error(`Failed to play music ${index + 1}`);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>BACK</Text>
      </TouchableOpacity>

      {audioFiles.map((_, index) => (
        <TouchableOpacity
          key={index}
          style={styles.playMusicButton}
          onPress={() => playMusic(index)}
        >
          <Text style={styles.buttonText}>Play Music {index + 1}</Text>
        </TouchableOpacity>
      ))}

      {showPermissionDenied && (
        <Text style={styles.permissionDeniedText}>
          Permission denied. You can't access music files without permission.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'silver',
  },
  backButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  playMusicButton: {
    backgroundColor: '#2ecc71',  // Change to green
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  permissionDeniedText: {
    marginTop: 20,
    color: 'red',
    textAlign: 'center',
  },
});

export default MusicPlayer;
