var cityInputEl = document.querySelector("#city-input");
var searchFormEl = document.querySelector("#form");
var errorEl = document.querySelector("#error-message");

function handleSubmitForm(event) {
    event.preventDefault();
    var cityInput = cityInputEl.value.toLowerCase();
    if(!cityInput) {
        errorEl.textContent = "Please type a city name!"
    }
    else {
        errorEl.textContent = "";
        var queryString = "./search-results.html?q=" + cityInput;
        location.assign(queryString);
        // getWeatherData(cityInput);
    }
}

searchFormEl.addEventListener("submit", handleSubmitForm);

// function getWeatherData(cityInput) {
//     var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=69f30a43ab68091abf44ef0a8bf5b7d9&units=imperial"
//     fetch(requestUrl)
//         .then(function (response) {
//             if (response.ok) {
//                 response.json()
//                 .then(function (data) {
//                     console.log(data);
//                     var currentTemp = data.main.temp;
//                     var currentWind = data.wind.speed;
//                     var currentHumid = data.main.humidity;
//                     var weatherIcon = data.weather[0].icon
//                     var lat = data.coord.lat;
//                     var lon = data.coord.lon;
//                     getUvIndex(cityInput, lat,lon);
//                     displayData(cityInput, currentTemp, currentWind, currentHumid, weatherIcon);
//                 })
//             }
//             else {
//                 alert("Error: " + response.statusText);
//             }
//         })
// }

// function getUvIndex(cityInput, lat,lon) {
//     var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?q=" + cityInput + "&appid=69f30a43ab68091abf44ef0a8bf5b7d9&lat=" + lat + "&lon=" + lon;
//     fetch(uvUrl)
//         .then(function(response){
//             if(response.ok) {
//                 response.json()
//                 .then(function(data) {
//                     console.log(data);
//                     var UvIndex = data.value;
//                     displayUv (UvIndex);
//                 })
//             }
//         })
// }

// function displayData(cityInput, currentTemp, currentWind, currentHumid, weatherIcon) {
//     console.log(currentTemp);
//     console.log(currentWind);
//     console.log(currentHumid);
//     console.log(weatherIcon);
//     //now need to display items
//     var cityResult = document.querySelector("#city-result");
//     cityResult.textContent = "City: " + cityInput;//add date
//     var tempResult = document.querySelector("#temp-result");
//     tempResult.textContent = "Temp: " + currentTemp;
//     var windResult = document.querySelector("#wind-result");
//     windResult.textContent = "Wind: " + currentWind;
//     var humidResult = document.querySelector("#humid-result");
//     humidResult.textContent = "Humidity: " + currentHumid;
//     //need to add weather icon
//     //need to add units
// }

// function displayUv(UvIndex) {
//     console.log(UvIndex);
//     var UvResult = document.querySelector("#uv-result");
//     UvResult.textContent = "UV Index: " + UvIndex;
//     //need to color code
// }

// now get and display 5-day forecast
// function getForecast() {
// }