import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const LastFmScreen = ({ navigation }) => {
  const [artist, setArtist] = useState('');
  const [songs, setSongs] = useState([]);
  const [artistDescription, setArtistDescription] = useState('');
  const [isSongsFetched, setIsSongsFetched] = useState(false);

  const fetchLastFmData = async () => {
    try {
      const apiKey = 'a98d741db6be0811eb86b1836fbd2d53';
      const [tracksResponse, artistInfoResponse] = await Promise.all([
        axios.get(
          `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&api_key=${apiKey}&artist=${artist}&format=json`
        ),
        axios.get(
          `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=${apiKey}&artist=${artist}&format=json`
        ),
      ]);

      if (tracksResponse.data.error || artistInfoResponse.data.error) {
        const errorMessage = tracksResponse.data.message || artistInfoResponse.data.message;
        console.error('Error fetching Last.fm data:', errorMessage);
        showAlert('Error', errorMessage);
        return;
      }

      const tracks = tracksResponse.data.toptracks.track;
      setSongs(tracks);
      setIsSongsFetched(true);

      const artistInfo = artistInfoResponse.data.artist;
      setArtistDescription(artistInfo.bio.summary);
    } catch (error) {
      console.error('Error fetching Last.fm data:', error.message);
      showAlert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>BACK</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Artist Name:</Text>

      <TextInput
        placeholder="Enter artist name"
        value={artist}
        onChangeText={(text) => setArtist(text)}
        style={styles.input}
      />

      {isSongsFetched && (
        <TouchableOpacity
          style={styles.descriptionButton}
          onPress={() => navigation.navigate('ArtistDescription', { artistDescription })}
        >
          <Text style={styles.buttonText}>Artist Description</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.fetchButton} onPress={fetchLastFmData}>
        <Text style={styles.buttonText}>Fetch Songs</Text>
      </TouchableOpacity>

      {isSongsFetched && (
        <FlatList
          data={songs}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.songContainer}>
              <Text style={styles.songText}>Song: {item.name}</Text>
            </View>
          )}
        />
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
  heading: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    width: '80%',
    textAlign: 'center',
    backgroundColor: '#2ecc71',
  },
  descriptionButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  fetchButton: {
    backgroundColor: '#e74c3c',
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
  songContainer: {
    marginVertical: 5,
  },
  songText: {
    fontSize: 16,
  },
});

export default LastFmScreen;
