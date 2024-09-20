import React, { useState } from 'react';

// Example list of cities, you can replace this with a more comprehensive list or fetch from an API.
const cities = ['Mumbai', 'Maharashtra', 'Goa', 'shajapur', 'Milan', 'Moscow', 'Ujjain', 'Manila'];

const Search = ({ onSearch, onLocate }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.length > 0) {
      const filteredSuggestions = cities.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    onSearch(city);
    setCity(''); // Clear input after search
    setSuggestions([]); // Clear suggestions after search
  };

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocate(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setSuggestions([]); // Clear suggestions when a suggestion is clicked
  };

  return (
    <div className="search">
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Enter city"
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleLocate}>Use Current Location</button>
      
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
