import React, { useState } from 'react';
import { fetchWeatherData } from './weatherService';
import WeatherDisplay from './displayWeather';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');       
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const data = await fetchWeatherData(city);
      setWeather(data);
      setCity('');  
    } catch (err) {
      setError('Failed to fetch weather data. Please check the city name.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="weather-app">
    <div className="left-panel">
      <div>
        <div className="day">Friday</div>
        <div className="date">18 Nov 2022</div>
        <div className="location">
          {weather ? `${weather.name} - ${weather.sys.country}` : 'City'}
        </div>
        <div className="sun-dot" />
        {weather && (
          <>
            <div className="temp-big">{Math.round(weather.main.temp)}°C</div>
            <div className="condition">{weather.weather[0].main}</div>
          </>
        )}
      </div>
    </div>

    <div className="right-panel">
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading weather data...</p>}
      {error && <p className="error">{error}</p>}
      {weather && <WeatherDisplay weather={weather} />}
    </div>
  </div>
);
};

export default WeatherApp;
