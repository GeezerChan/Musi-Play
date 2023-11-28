import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="BACK" onPress={() => navigation.goBack()} />

      <Text>Artist Name:</Text>

      <TextInput
        placeholder="Enter artist name"
        value={artist}
        onChangeText={(text) => setArtist(text)}
        style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      {isSongsFetched && (
        <Button
          title="Artist Description"
          onPress={() => navigation.navigate('ArtistDescription', { artistDescription })}
          style={{ marginVertical: 10 }}
        />
      )}

      <Button title="Fetch Songs" onPress={fetchLastFmData} />

      {isSongsFetched && (
        <FlatList
          data={songs}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 5 }}>
              <Text>Song: {item.name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default LastFmScreen;
