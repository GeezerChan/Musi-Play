import React from 'react';
import { View, Text } from 'react-native';

const ArtistDescriptionScreen = ({ route }) => {
  const { artistDescription } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Artist Description</Text>
      <Text>{artistDescription}</Text>
    </View>
  );
};

export default ArtistDescriptionScreen;
