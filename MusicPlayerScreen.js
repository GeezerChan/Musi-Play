import React, { useEffect, useState } from 'react';
import { View, Button, Text, Linking, Alert } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import DocumentPicker from 'react-native-document-picker';
import Sound from 'react-native-sound';

const MusicPlayer = ({ navigation }) => {
  const [showPermissionDenied, setShowPermissionDenied] = useState(false);

  useEffect(() => {
    requestStoragePermission();
  }, []);

  const requestStoragePermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
  
      if (result === 'granted') {
        // Permission granted, proceed with the operation
        loadSongs();
      } else if (result === 'never_ask_again') {
        // User denied permission with "Never ask again"
        setShowPermissionDenied(true);
      } else {
        // User denied permission
        setShowPermissionDenied(true);
      }
    } catch (error) {
      console.error('Error requesting permission', error);
      setShowPermissionDenied(true);
    }
  };
  

  const loadSongs = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
  
      console.log('Document Picker Result:', result);
  
      if (result.uri) {
        const allowedExtensions = ['.mp3', '.wav'];
        const fileExtension =
          result.name && result.name.lastIndexOf('.') !== -1
            ? result.name.slice(result.name.lastIndexOf('.')).toLowerCase()
            : '';
  
        console.log('File Extension:', fileExtension);
  
        if (!allowedExtensions.includes(fileExtension)) {
          console.log('Invalid file type selected');
          return;
        }
  
        const sound = new Sound(result.uri, '', (error) => {
          if (error) {
            console.error('Error loading sound', error);
            setShowPermissionDenied(true);
          } else {
            sound.play(() => sound.release());
          }
        });
      } else {
        console.log('No valid document picked');
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Document picker cancelled');
      } else {
        console.error('Error picking document', error);
        setShowPermissionDenied(true);
      }
    }
  };
  
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="BACK" onPress={() => navigation.goBack()} />
      <Button title="Load Songs" onPress={loadSongs} />

      {showPermissionDenied && (
        <Text style={{ marginTop: 20 }}>Permission denied. You can't access music files without permission.</Text>
      )}
    </View>
  );
};

export default MusicPlayer;
