import axios from 'axios';

const API_KEY = 'e12834b26a7c7129b5423a416e7973f8';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric' 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error.response || error.message);
    throw error;
  }
};
