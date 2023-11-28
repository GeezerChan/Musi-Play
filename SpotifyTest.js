// SpotifyTest.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import { encode } from 'base-64';

const CLIENT_ID = '37ae3dcff3c74b17a557bd64d8a8613b';
const CLIENT_SECRET = 'e1ee0ac0ea124c5c8d2734a9f6aff8e9';

const SpotifyTest = ({ navigation }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isValidToken, setIsValidToken] = useState(false);

  const fetchAccessToken = async () => {
    try {
      const credentials = `${CLIENT_ID}:${CLIENT_SECRET}`;
      const base64Credentials = encode(credentials);

      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );

      const token = response.data.access_token;
      setAccessToken(token);

      // Check if the token is valid
      const isValid = await checkTokenValidity(token);
      setIsValidToken(isValid);
    } catch (error) {
      console.error('Error getting access token:', error.message);
      if (error.response && error.response.data) {
        console.error('Error response data:', error.response.data);
      }
    }
  };

  const checkTokenValidity = async (token) => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // If the request is successful, the token is considered valid
      return true;
    } catch (error) {
      // If the request fails, the token is considered invalid
      return false;
    }
  };

  useEffect(() => {
    fetchAccessToken();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="BACK" onPress={() => navigation.goBack()} />
    
      <Text>Access Token:</Text>
      <Text>{accessToken}</Text>
      <Text>{isValidToken ? 'Token is valid' : 'Token is invalid'}</Text>
      <Button title="Refresh Token" onPress={fetchAccessToken} />
    </View>
  );
};

export default SpotifyTest;
