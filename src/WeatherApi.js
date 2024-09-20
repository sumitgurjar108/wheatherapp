import axios from 'axios';

const API_KEY = '1be48ab8e09b499595e70710242108'; // Your WeatherAPI key
const BASE_URL = 'https://api.weatherapi.com/v1/'; // Correct base URL for WeatherAPI

export const fetchWeatherData = async (city) => {
  try {
    const weatherResponse = await axios.get(`${BASE_URL}current.json`, {
      params: {
        key: API_KEY,
        q: city,
        aqi: 'no', 
      },
    });

    const forecastResponse = await axios.get(`${BASE_URL}forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days: 5, // 5-day forecast
        aqi: 'no',
        alerts: 'no',
      },
    });

    return {
      weather: weatherResponse.data,
      forecast: forecastResponse.data.forecast.forecastday, // Adjust the response structure for WeatherAPI
    };
  } catch (error) {
    console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const fetchWeatherDataByCoords = async (lat, lon) => {
  try {
    const location = `${lat},${lon}`;
    const weatherResponse = await axios.get(`${BASE_URL}current.json`, {
      params: {
        key: API_KEY,
        q: location,
        aqi: 'no',
      },
    });

    const forecastResponse = await axios.get(`${BASE_URL}forecast.json`, {
      params: {
        key: API_KEY,
        q: location,
        days: 5,
        aqi: 'no',
        alerts: 'no',
      },
    });

    return {
      weather: weatherResponse.data,
      forecast: forecastResponse.data.forecast.forecastday,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
    throw error;
  }
};
