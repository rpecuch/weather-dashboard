var cityInputEl = document.querySelector("#city-input");
var submitBtn = document.querySelector("#submit-btn");
var errorEl = document.querySelector("#error-message");
var cityResult = document.querySelector("#city-result");
var resultContentEl = document.querySelector("#result-content");

//generates city search parameter from webpage url
function getSearchP() {
    var query = document.location.search.split("=");
    var cityQuery = query[1];
    getCoords(cityQuery);
}
//called when page loads
getSearchP();

//api call to retrieve coordinates of city that will be used to make api call for forecast data
function getCoords(cityQuery) {
    var coordsUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityQuery + "&appid=69f30a43ab68091abf44ef0a8bf5b7d9&units=imperial"
    fetch(coordsUrl)
        .then(function(response) {
            if(response.ok) {
                response.json()
                .then(function(data) {
                    //retrieve city's coordinates from data
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    getForecast(lat, lon, cityQuery);
                })
            }
        })
}

//api call to retrieve current and future forecast data
function getForecast(lat, lon, cityQuery) {
    var requestUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=69f30a43ab68091abf44ef0a8bf5b7d9";
    fetch(requestUrl)
        .then(function(response) {
            if (response.ok) {
                response.json()
                .then(function(data) {
                    //extract desired data points
                    var currentDate = data.current.dt;
                    var currentTemp = data.current.temp;
                    var currentWind = data.current.wind_speed;
                    var currentHumid = data.current.humidity;
                    var weatherIcon = data.current.weather[0].icon;
                    var uvIndex = data.current.uvi;
                    displayData(cityQuery,currentDate, currentTemp, currentWind, currentHumid, weatherIcon, uvIndex);
                    //function will be ran on the next upcoming 5 days
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

//displays current forecast data to page
function displayData(cityQuery, currentDate,currentTemp, currentWind, currentHumid, weatherIcon, uvIndex) {
    var cityResult = document.querySelector("#city-result");
    //converting first letter of city name to a capital letter
    var cityArray = cityQuery.split("");
    var capitalLetter = cityArray[0].toUpperCase();
    cityArray.shift();
    cityArray.unshift(capitalLetter);
    var searchResultText = cityArray.join("");
    cityResult.textContent = searchResultText;
    //container for results
    var resultContainer = document.createElement("div");
    resultContainer.classList.add("card", "mb-3", "p-3", "custom-result-card");
    var resultBody = document.createElement("div");
    resultBody.setAttribute("class", "card-body");
    resultContainer.append(resultBody);
    //current date
    var dateEl = document.createElement("h3");
    var formatDate = moment.unix(currentDate).format("MMM Do YYYY");
    dateEl.textContent = formatDate;
    //weather icon
    var iconEl = document.createElement("img");
    var iconLink = "https://openweathermap.org/img/w/" + weatherIcon + ".png";
    iconEl.setAttribute("src", iconLink);
    //list containing temp, wind speed, humidity, and uv
    var resultsList = document.createElement("ul");
    resultBody.appendChild(resultsList);
        //current temp
        var tempResult = document.createElement("li");
        tempResult.textContent = "Temp: " + currentTemp + " ℉";
        //current wind speed
        var windResult = document.createElement("li");
        windResult.textContent = "Wind: " + currentWind + " MPH";
        //current humidity
        var humidResult = document.createElement("li");
        humidResult.textContent = "Humidity: " + currentHumid + " %";
        //current uv index
        var uvResult = document.createElement("li");
        uvResult.textContent = "UV Index: " + uvIndex;
            //color coding uv index based on severity
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
            //style uv index result
            uvResult.style.backgroundColor = uvCondition;
            uvResult.style.display = "inline";
            uvResult.style.padding = "3px";
            uvResult.style.borderRadius = "5px 5px 5px 5px";
    resultsList.append(dateEl, iconEl, tempResult, windResult, humidResult, uvResult);
    resultContentEl.append(resultContainer);
    //save city to local storage
    saveSearch(searchResultText);
}

//displays upcoming forecast data for next 5 days
function displayForecast(dailyForecast) {
    //container for forecast info
    var dailyContainer = document.createElement("div");
    dailyContainer.classList.add("card", "mb-3", "p-3");
    var dailyBody = document.createElement("div");
    dailyBody.setAttribute("class", "card-body");
    dailyContainer.append(dailyBody);
    //date
    var dateEl = document.createElement("h3");
    dateEl.textContent = moment.unix(dailyForecast.dt).format("MMM Do YYYY");
    //list containing icon, temp, wind speed, and humidity
    var dailyList = document.createElement("ul");
    dailyBody.appendChild(dailyList);
        //icon
        var dailyIconEl = document.createElement("img");
        var dailyIconLink = "https://openweathermap.org/img/w/" + dailyForecast.weather[0].icon + ".png";
        dailyIconEl.setAttribute("src", dailyIconLink);
        //temp
        var dailyTemp = document.createElement("li");
        dailyTemp.textContent = "Temp: " + dailyForecast.temp.day + " ℉";
        //wind speed
        var dailyWind = document.createElement("li");
        dailyWind.textContent = "Wind: " + dailyForecast.wind_speed + " MPH";
        //humidity
        var dailyHumid = document.createElement("li");
        dailyHumid.textContent = "Humidity: " + dailyForecast.humidity + " %";
    dailyList.append(dateEl, dailyIconEl,dailyTemp, dailyWind, dailyHumid);
    resultContentEl.append(dailyContainer);
}

//saves data to local storage
function saveSearch(searchResultText) {
    const currentSearch = searchResultText;
    //check if city already saved
    const pastSearch = localStorage.getItem(currentSearch)
    //only save city if not already saved
    if (pastSearch === null) {
        localStorage.setItem(currentSearch, currentSearch);
    }
}