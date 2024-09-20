// src/App.js

import React, { useState } from 'react';
import Header from './Header';
import Search from './Search';
import WeatherDisplay from './WeatherDisplay';
import { fetchWeatherData, fetchWeatherDataByCoords } from './WeatherApi';


const App = () => {
  const [weatherData, setWeatherData] = useState({ weather: null, forecast: [] });
  const [error, setError] = useState('');

  const handleSearch = async (city) => {
    try {
      setError('');
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (error) {
      setError('Unable to fetch weather data. Please try again.');
    }
  };

  const handleLocationSearch = async (latitude, longitude) => {
    try {
      setError('');
      const data = await fetchWeatherDataByCoords(latitude, longitude);
      setWeatherData(data);
    } catch (error) {
      setError('Unable to fetch weather data. Please try again.');
    }
  };

  return (
    <div className="weather-app">
      <Header />
      <Search onSearch={handleSearch} onLocate={handleLocationSearch} />
      {error && <p className="error">{error}</p>}
      <WeatherDisplay weather={weatherData.weather} forecast={weatherData.forecast} />
    </div>
  );
};

export default App;
