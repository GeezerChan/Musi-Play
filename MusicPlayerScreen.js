import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';

const MusicPlayer = ({ navigation }) => {
  const [showPermissionDenied, setShowPermissionDenied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);

  // Enable playback in silence mode
  Sound.setCategory('Playback');

  const audioFiles = [
    { name: 'Song 1', fileName: 'Time Left', path: require('./assets/Time_Left.mp3') },
    { name: 'Song 2', fileName: 'S.S.Anne', path: require('./assets/S_S_Anne.mp3') },
    { name: 'Song 3', fileName: 'Nisekoi3', path: require('./assets/_Nisekoi_OST_3_mp3.wav') },
    { name: 'Song 4', fileName: 'Nisekoi5', path: require('./assets/_Nisekoi_OST_5_mp3.wav') },
    { name: 'Song 5', fileName: 'Grimgar', path: require('./assets/Grimgar_Ost.mp3') },
    { name: 'Song 6', fileName: 'Wiosna', path: require('./assets/Wiosna.mp3') },
  ];

  const playPauseMusic = () => {
    if (currentSound) {
      if (currentSound.isPlaying()) {
        currentSound.pause();
      } else {
        currentSound.play((success) => {
          if (success) {
            console.log('Music playback successful');
          } else {
            console.error('Failed to play music');
          }
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playMusic = (index) => {
    if (currentSound) {
      currentSound.stop(); // Stop the current sound if another one is selected
    }

    const sound = new Sound(audioFiles[index].path, (error) => {
      if (error) {
        console.error(`Failed to load sound ${index + 1}`, error);
        setShowPermissionDenied(true);
      } else {
        sound.play((success) => {
          if (success) {
            console.log(`Music ${audioFiles[index].name} playback successful`);
          } else {
            console.error(`Failed to play music ${audioFiles[index].name}`);
          }
          setCurrentSound(null);
          setIsPlaying(false);
        });
      }
    });

    setCurrentSound(sound);
    setIsPlaying(true);
  };

  useEffect(() => {
    // Clean up the sound instance when the component unmounts
    return () => {
      if (currentSound) {
        currentSound.stop();
        currentSound.release();
      }
    };
  }, [currentSound]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>BACK</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={isPlaying ? styles.pauseButton : styles.playButton}
        onPress={playPauseMusic}
      >
        <Text style={styles.buttonText}>{isPlaying ? 'PAUSE' : 'PLAY'}</Text>
      </TouchableOpacity>

      {audioFiles.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.playMusicButton}
          onPress={() => playMusic(index)}
        >
          <Text style={styles.buttonText}>Play {item.fileName}</Text>
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
  playButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  pauseButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  playMusicButton: {
    backgroundColor: '#2ecc71',
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
