var cityInputEl = document.querySelector("#city-input");
var submitBtn = document.querySelector("#submit-btn");
var errorEl = document.querySelector("#error-message");
var cityResult = document.querySelector("#city-result");
var resultContentEl = document.querySelector("#result-content");

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
                    getForecast(lat, lon, cityQuery);
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
                    var currentDate = data.current.dt;
                    var currentTemp = data.current.temp;
                    var currentWind = data.current.wind_speed;
                    var currentHumid = data.current.humidity;
                    var weatherIcon = data.current.weather[0].icon;
                    var uvIndex = data.current.uvi;
                    displayData(cityQuery,currentDate, currentTemp, currentWind, currentHumid, weatherIcon, uvIndex);

                    for(var i=1; i<6; i++) {
                        displayForecast(data.daily[i]);
                    }

                })
                .catch(function(error) {
                    console.error(error);
                })
            }
            else {
                alert("Error: " + response.statusText);
            }
        })
}

//1 to do
function displayData(cityQuery, currentDate,currentTemp, currentWind, currentHumid, weatherIcon, uvIndex) {
    console.log(currentTemp);
    console.log(currentWind);
    console.log(currentHumid);
    console.log(weatherIcon);
    var cityResult = document.querySelector("#city-result");
    var cityArray = cityQuery.split("");
    var capitalLetter = cityArray[0].toUpperCase();
    cityArray.shift();
    cityArray.unshift(capitalLetter);
    var searchResultText = cityArray.join("");
    cityResult.textContent = searchResultText;

    var resultContainer = document.createElement("div");
    resultContainer.classList.add("card", "mb-3", "p-3");
    var resultBody = document.createElement("div");
    resultBody.setAttribute("class", "card-body");
    resultContainer.append(resultBody);
    var dateEl = document.createElement("h3");
    var formatDate = moment.unix(currentDate).format("MMM Do YYYY");
    dateEl.textContent = formatDate;
    var iconEl = document.createElement("img");
    var iconLink = "https://openweathermap.org/img/w/" + weatherIcon + ".png";
    iconEl.setAttribute("src", iconLink);
    var resultsList = document.createElement("ul");
    resultBody.appendChild(resultsList);
    var tempResult = document.createElement("li");
    tempResult.textContent = "Temp: " + currentTemp + " ℉";
    var windResult = document.createElement("li");
    windResult.textContent = "Wind: " + currentWind + " MPH";
    var humidResult = document.createElement("li");
    humidResult.textContent = "Humidity: " + currentHumid + " %";
    //make this look better
    var uvResult = document.createElement("li");
    uvResult.textContent = "UV Index: " + uvIndex;
    var uvCondition;
    if(uvIndex <= 2) {
        uvCondition = "green";
    }
    else if (uvIndex > 7) {
        uvCondition = "red";
    }
    else {
        uvCondition = "yellow";
    }
    uvResult.style.backgroundColor = uvCondition;
    resultsList.append(dateEl, iconEl, tempResult, windResult, humidResult, uvResult);
    resultContentEl.append(resultContainer);
    saveSearch(searchResultText);
}

function displayForecast(dailyForecast) {
    console.log(dailyForecast);
    var dailyContainer = document.createElement("div");
    dailyContainer.classList.add("card", "mb-3", "p-3");
    var dailyBody = document.createElement("div");
    dailyBody.setAttribute("class", "card-body");
    dailyContainer.append(dailyBody);
    var dateEl = document.createElement("h3");
    dateEl.textContent = moment.unix(dailyForecast.dt).format("MMM Do YYYY");
    var dailyList = document.createElement("ul");
    dailyBody.appendChild(dailyList);
    var dailyIconEl = document.createElement("img");
    var dailyIconLink = "https://openweathermap.org/img/w/" + dailyForecast.weather[0].icon + ".png";
    dailyIconEl.setAttribute("src", dailyIconLink);
    var dailyTemp = document.createElement("li");
    dailyTemp.textContent = "Temp: " + dailyForecast.temp.day + " ℉";
    var dailyWind = document.createElement("li");
    dailyWind.textContent = "Wind: " + dailyForecast.wind_speed + " MPH";
    var dailyHumid = document.createElement("li");
    dailyHumid.textContent = "Humidity: " + dailyForecast.humidity + " %";
    dailyList.append(dateEl, dailyIconEl,dailyTemp, dailyWind, dailyHumid);
    resultContentEl.append(dailyContainer);
}

searchFormEl.addEventListener("submit", handleSubmitForm);

//parameter in place to stop from saving twice
function saveSearch(searchResultText) {
    let currentSearch = [{
        city: searchResultText
    }
    ]
    let storedSearches = JSON.parse(localStorage.getItem("pastSearches"));
    if(storedSearches !== null) {
        storedSearches.push(currentSearch[0]);
    }
    else{
        storedSearches = currentSearch;
    }
    localStorage.setItem("pastSearches", JSON.stringify(storedSearches));
}