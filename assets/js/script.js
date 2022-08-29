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