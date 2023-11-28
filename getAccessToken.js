import axios from 'axios';
import { encode } from 'base-64';

const CLIENT_ID = '37ae3dcff3c74b17a557bd64d8a8613b';
const CLIENT_SECRET = 'Removed for safety reasons';

const getAccessToken = async () => {
  try {
    const credentials = `${CLIENT_ID}:${CLIENT_SECRET}`;
    const base64Credentials = encode(credentials);

    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${base64Credentials}`,
        },
      }
    );

    const accessToken = response.data.access_token;
    console.log('Access Token:', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error.message);
    throw error;
  }
};

export default getAccessToken;
