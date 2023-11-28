import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const ArtistDescriptionScreen = ({ route }) => {
  const { artistDescription } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Artist Description</Text>
      <Text style={styles.description}>{artistDescription}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'silver',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ArtistDescriptionScreen;
