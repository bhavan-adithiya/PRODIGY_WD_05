// script.js
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const locationInput = document.getElementById('locationInput');
    const weatherContainer = document.getElementById('weatherContainer');

    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';

    searchButton.addEventListener('click', function() {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeather(location);
        } else {
            alert('Please enter a location.');
        }
    });

    async function fetchWeather(location) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
            const data = await response.json();

            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching weather data. Please try again later.');
        }
    }

    function displayWeather(data) {
        const { name, main, weather } = data;

        const weatherHTML = `
            <h2>${name}</h2>
            <p>Temperature: ${main.temp} &deg;C</p>
            <p>Weather: ${weather[0].description}</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;

        weatherContainer.innerHTML = weatherHTML;
    }
});
