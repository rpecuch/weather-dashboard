var cityInputEl = document.querySelector("#city-input");
var submitBtn = document.querySelector("#submit-btn");
var errorEl = document.querySelector("#error-message");

function handleSubmitForm(event) {
    event.preventDefault();
    var cityInput = cityInputEl.value.toLowerCase();
    if(cityInput === "") {
        errorEl.textContent = "Please type a city name!"
    }
    else {
        errorEl.textContent = "";
        getWeatherData(cityInput);
    }
}

submitBtn.addEventListener("click", handleSubmitForm);

function getWeatherData(cityInput) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=69f30a43ab68091abf44ef0a8bf5b7d9&units=imperial"
    fetch(requestUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                .then(function (data) {
                    console.log(data);
                    var currentTemp = data.main.temp;
                    var currentWind = data.wind.speed;
                    var currentHumid = data.main.humidity;
                    var weatherIcon = data.weather[0].icon
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    getUvIndex(lat,lon);
                    displayData(currentTemp, currentWind, currentHumid, weatherIcon)
                    //also need uv index
                })
            }
            else {
                alert("Error: " + response.statusText);
            }
        })
}

function getUvIndex(lat,lon) {
    var uvUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=69f30a43ab68091abf44ef0a8bf5b7d9";
    fetch(uvUrl)
        .then(function(response){
            if(response.ok) {
                response.json()
                .then(function(data) {
                    console.log(data);
                })
            }
        })
}

function displayData(currentTemp, currentWind, currentHumid, weatherIcon) {
    console.log(currentTemp);
    console.log(currentWind);
    console.log(currentHumid);
    console.log(weatherIcon);
    //now need to display items
}