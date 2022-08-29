// var cityInputEl = document.querySelector("#city-input");
// var submitBtn = document.querySelector("#submit-btn");
// var errorEl = document.querySelector("#error-message");
var cityResult = document.querySelector("#city-result");
var resultContentEl = document.querySelector("#result-content");
var searchFormEl = document.querySelector("#form");

function getSearchP() {
    var query = document.location.search.split("=");
    var cityQuery = query[1];
    console.log(cityQuery);
    getCoords(cityQuery);
}

getSearchP();

function getCoords(cityQuery) {
    var coordsUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityQuery + "&appid=69f30a43ab68091abf44ef0a8bf5b7d9&units=imperial"
    fetch(coordsUrl)
        .then(function(response) {
            if(response.ok) {
                response.json()
                .then(function(data) {
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    getForecast(lat, lon);
                })
            }
        })
}

function getForecast(lat, lon, cityQuery) {
    var requestUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=69f30a43ab68091abf44ef0a8bf5b7d9";
    fetch(requestUrl)
        .then(function(response) {
            if (response.ok) {
                response.json()
                .then(function(data) {
                    console.log(data);
                    var currentTemp = data.current.temp;
                    var currentWind = data.current.wind_speed;
                    var currentHumid = data.current.humidity;
                    var weatherIcon = data.current.weather[0].icon;
                    var uvIndex = data.current.uvi;
                    displayData(cityQuery, currentTemp, currentWind, currentHumid, weatherIcon, uvIndex);
                })
            }
        })
}

// function getWeatherData(cityQuery) {
//     var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityQuery + "&appid=69f30a43ab68091abf44ef0a8bf5b7d9&units=imperial"
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
//                     getUvIndex(cityQuery, lat,lon);
//                     displayData(cityQuery, currentTemp, currentWind, currentHumid, weatherIcon);
//                 })
//                 .catch(function(error) {
//                     console.error(error);
//                 })
//             }
//             else {
//                 alert("Error: " + response.statusText);
//             }
//         })
// }

function displayData(cityQuery, currentTemp, currentWind, currentHumid, weatherIcon, uvIndex) {
    console.log(currentTemp);
    console.log(currentWind);
    console.log(currentHumid);
    console.log(weatherIcon);
    //now need to display items
    var cityResult = document.querySelector("#city-result");
    cityResult.textContent = cityQuery;

    var resultContainer = document.createElement("div");
    resultContainer.classList.add("card", "mb-3", "p-3");
    var resultBody = document.createElement("div");
    resultBody.setAttribute("class", "card-body");
    resultContainer.append(resultBody);
    var dateEl = document.createElement("h3");
    //might need to link and use moment instead
    dateEl.textContent = "8/28/22";
    var resultsList = document.createElement("ul");
    resultBody.appendChild(resultsList);
    var tempResult = document.createElement("li");
    tempResult.textContent = "Temp: " + currentTemp;
    var windResult = document.createElement("li");
    windResult.textContent = "Wind: " + currentWind;
    var humidResult = document.createElement("li");
    humidResult.textContent = "Humidity: " + currentHumid;
    var uvResult = document.createElement("li");
    uvResult.textContent = "UV Index: " + uvIndex;
    resultsList.append(tempResult, windResult, humidResult, uvResult);
    //need to add weather icon
    //need to add units
    resultContentEl.append(resultContainer);
}

// function displayUv(UvIndex) {
//     var UvResult = document.createElement("li");
//     UvResult.textContent = "UV Index: " + UvIndex;
//     resultsList.append(UvResult);
    //need to color code
// }

// now get and display 5-day forecast
// function getForecast() {
// }