function showWeatherInformation(response) {
    console.log(response);
    let currentCity = (response.data.name);
    let currentCountry = (response.data.sys.country);
    console.log(currentCountry);
    let weatherConditionDescription = (response.data.weather[0].description);
    let currentTemp = Math.round(response.data.main.temp);
    // let precipitation = (response.data.pop);
    // console.log(precipitation);
    let wind = (response.data.wind.speed);
    let humidity = (response.data.main.humidity);

    let currentLocation = document.querySelector("#current-location");
    currentLocation.innerHTML = (currentCity);
    let weatherCondition = document.querySelector("#description-of-current-condition");
    weatherCondition.innerHTML = (weatherConditionDescription);
    let currentTemperature = document.querySelector("#temperature");
    currentTemperature.innerHTML = (currentTemp);
    let windSpeed = document.querySelector("#wind");
    windSpeed.innerHTML = (`Wind: ${wind} mph`);
    let currentHumidity = document.querySelector("#humidity");
    currentHumidity.innerHTML = (`Humidity: ${humidity}%`);
}

function retrievePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "1033a233134c723061a43e40b7ce9f09";
    let units = "imperial";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    
    axios.get(apiUrl).then(showWeatherInformation);
}

function searchForCity(event) {
    event.preventDefault();
    let searchCityInput = document.querySelector("#city-input");
    let newLocation = document.querySelector("#current-location");
    newLocation.innerHTML = searchCityInput.value;

    let city = searchCityInput.value;
    let apiKey = "1033a233134c723061a43e40b7ce9f09";
    let units = "imperial";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showWeatherInformation);
}

function goHome(){
    navigator.geolocation.getCurrentPosition(retrievePosition);    
}

function formatDate(date) {
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

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

    return `${currentDay} ${hour}:${minutes}`;
}

let currentDayAndTime = document.querySelector("#current-day-and-time");
let currentTime = new Date();

currentDayAndTime.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchForCity);

let returnHome = document.querySelector("#return-to-current-location");
returnHome.addEventListener("click", goHome);

navigator.geolocation.getCurrentPosition(retrievePosition);