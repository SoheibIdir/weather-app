/* Weather app */
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "853815d35e62d3dec8ace0fa95a0cb49";
const C = document.getElementById("C");
const F = document.getElementById("F");
const cityDisplay = document.querySelector(".cityDisplay");
const tempNumDisplay = document.querySelector(".tempNumDisplay");
const humidityDisplay = document.querySelector(".humidityDisplay");
const descDisplay = document.querySelector(".descDisplay");
const weatherEmoji = document.querySelector(".weatherEmoji");
const errorDisplay = document.querySelector(".errorDisplay");

let temperatureCelsius;
let temperatureFahrenheit;
let isCelsius = true; // Track if the current unit is Celsius
let cityArray = [];

// Form submit event
weatherForm.addEventListener("submit", event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        cityArray.push(city);
        getWeatherData(city);
    } else {
        displayError("Please enter a valid city name.");
    }
});

// Toggle to Celsius
C.addEventListener("click", () => {
    if (!isCelsius) {
        isCelsius = true;
        displayTemperature();
        C.style.color = "white";
        F.style.color = "grey";
    }
});

// Toggle to Fahrenheit
F.addEventListener("click", () => {
    if (isCelsius) {
        isCelsius = false;
        displayTemperature();
        F.style.color = "white";
        C.style.color = "grey";
    }
});

// Fetch weather data
async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("Could not get source");
        }
        const data = await response.json();
        displayWeatherInfo(data);
        console.log(data)
        // Store temperatures in both Celsius and Fahrenheit
        temperatureCelsius = data.main.temp;
        temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;

        displayTemperature(); // Show temperature in the initial unit (Celsius)
    } catch (error) {
        console.error(error);
    }
}

// Display temperature based on selected unit
function displayTemperature() {
    tempNumDisplay.textContent = isCelsius
        ? `${temperatureCelsius.toFixed(1)}`
        : `${temperatureFahrenheit.toFixed(1)}`;
}

// Display weather information
function displayWeatherInfo(data) {
    cityInput.value = "";
    cityDisplay.textContent = data.name;
    humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;
    descDisplay.textContent = data.weather[0].description;
    weatherEmoji.textContent = getWeatherEmoji(data.weather[0].id);
};

function getWeatherEmoji(weatherId) {
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "🌩️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "❓";
        }
}

function displayError(message) {
    errorDisplay.textContent = message
}