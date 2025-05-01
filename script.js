// OpenWeatherMap API configuration
const API_KEY = `bd02fa4c859df0210d1e2450c5871190`
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherDisplay = document.getElementById('weather-display');
const errorMessage = document.getElementById('error-message');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weather-icon');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const secondContainer = document.getElementById('second-container');
// Event listeners
searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});

// Fetch weather data
async function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) return;

    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        if (data.cod === '404') {
            showError();
            return;
        }

        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError();
    }
}

// Display weather information
function displayWeather(data) {
    weatherDisplay.classList.remove('hidden');
    errorMessage.classList.add('hidden');

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = Math.round(data.main.temp);
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    description.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = data.wind.speed;
}

// Show error message
function showError() {
    weatherDisplay.classList.add('hidden');
    errorMessage.classList.remove('hidden');
}

// Clear input on focus
cityInput.addEventListener('focus', () => {
    cityInput.value = '';
});

// Display second container
secondContainer.style.display = 'block';

