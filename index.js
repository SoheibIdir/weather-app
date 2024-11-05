/*Weather app*/

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "853815d35e62d3dec8ace0fa95a0cb49";
const C = document.getElementById("C");
const F = document.getElementById("F");
let unit = "metric";
//----------HTML Elements-----------------------needs to be completed
const cityDisplay = document.querySelector(".cityDisplay");
const tempNumDisplay = document.querySelector(".tempNumDisplay");
const humidityDisplay = document.querySelector(".humidityDisplay");
const descDisplay = document.querySelector(".descDisplay");
let cityArray = [];

weatherForm.addEventListener("submit", event => {
    event.preventDefault();
    const city = cityInput.value
    cityArray.push(city)
    
    
    if(city){
        getWeatherData(city)
    }else{
        displayError(messege)
    }
})

C.addEventListener("click", event => {
    unit = "metric"
    city = cityArray.slice(-1)
    getWeatherData(city)
    C.style.color = "white"
    F.style.color = "grey"
})

F.addEventListener("click", event => {
    unit = "imperial"
    city = cityArray.slice(-1)
    getWeatherData(city)
    F.style.color = "white"
    C.style.color = "grey"
})


async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`)
        if(!response.ok){
            throw new Error("Could not get source");
        }
        const data = await response.json()
        console.log(data)
        displayWeatherInfo(data);

    }catch(error) {
        console.error(error)
    }
}

function displayWeatherInfo(data){
    cityInput.value = "";
    cityDisplay.textContent = data.name;
    tempNumDisplay.textContent = `${data.main.temp}`;
    humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;
    descDisplay.textContent = data.weather[0].description;
}

function getWeatherEmoji(weatherId){

}

function displayError(messege){

}
