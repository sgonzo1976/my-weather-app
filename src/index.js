function showWeatherInformation(response) {
    let currentTemperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description-of-current-condition");
    let windElement = document.querySelector("#wind");
    let humidityElement = document.querySelector("#humidity");
    currentTemperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    humidityElement.innerHTML = response.data.main.humidity;
}

let apiKey = "1033a233134c723061a43e40b7ce9f09";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Papillion&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(showWeatherInformation);