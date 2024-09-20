import React from 'react';
import './index.css';

const WeatherDisplay = ({ weather, forecast }) => {
  if (!weather || !forecast || forecast.length === 0) {
    return <div className="weather-container loading">Loading...</div>;
  }

  return (
    <div className="weather-container">
      <h2>{weather.location.name} Weather</h2>
      <p>Temperature: {weather.current.temp_c}°C</p>
      <div className="forecast-container">
        <h3>5-Day Forecast:</h3>
        <ul>
          {forecast.map((day, index) => (
            <li key={index}>
              {day.date}: {day.day.avgtemp_c}°C
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherDisplay;
