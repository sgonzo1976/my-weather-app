function formatDate(timestamp) {
    let date = new Date(timestamp);

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let currentDay = days[date.getDay()];
    return `${currentDay} ${formatTime(timestamp)}`;
}

function formatTime(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`;
}

function showWeatherInformation(response) {
    let dateElement = document.querySelector("#current-day-and-time");
    let iconElement = document.querySelector("#weather-icon");
    let currentTemperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description-of-current-condition");
    let windElement = document.querySelector("#wind");
    let humidityElement = document.querySelector("#humidity");

    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
    fahrenheitTemperature = response.data.main.temp;
    currentTemperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    humidityElement.innerHTML = response.data.main.humidity;
}

function search(city) {
    let apiKey = "1033a233134c723061a43e40b7ce9f09";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(showWeatherInformation);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function convertToCelsius(event){
    event.preventDefault();
    let currentTemperatureElement = document.querySelector("#temperature");

    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let celsiusTemperature = (fahrenheitTemperature - 32) * 5/9;
    currentTemperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let currentTemperatureElement = document.querySelector("#temperature");
    currentTemperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

search("Papillion");