import axios from 'axios';

export const requestAccessToken = async () => {
  const clientId = '34980fdd86484119b151be617f1d5444';
  const clientSecret = 'fc6d9335209c474a89fb02f364bde157';

  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');
  data.append('client_id', clientId);
  data.append('client_secret', clientSecret);

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error('Error requesting access token:', error);
    throw error;
  }
};

export const getArtistData = async (artistId) => {
  const accessToken = await requestAccessToken();

  try {
    const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(response.data);
    // Process the artist data and update your component state or perform other actions
  } catch (error) {
    console.error('Error fetching artist data:', error);
  }
};

// Call the function to retrieve artist data
getArtistData('6OqhFYFJDnBBHas02HopPT?si=dLzDGPpxSbueZxZYNrBTdg');