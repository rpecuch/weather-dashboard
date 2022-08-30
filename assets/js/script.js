var cityInputEl = document.querySelector("#city-input");
var searchFormEl = document.querySelector("#form");
var errorEl = document.querySelector("#error-message");
var historyContainer = document.querySelector("#history-content");

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

//put parameter in place to prevent same button from displaying twice
function retrievePastSearches() {
    let storedSearches = JSON.parse(localStorage.getItem("pastSearches"));
    if(storedSearches !== null) {
        for(i=0; i<storedSearches.length; i++) {
            var historyListEl = document.createElement("button");
            historyListEl.textContent = storedSearches[i].city;
            historyListEl.setAttribute("class", "history-btn")
            historyContainer.appendChild(historyListEl);
        }

    }
}

retrievePastSearches();

// function retrieveHistoricalData(event) {
//     event.preventDefault();
//     var key = event.target.textContent;
//     console.log(key);
//     // var historical = localStorage.getItem(key);
// }

// //needs to run when button clicked
// historyContainer.addEventListener("click", ".history-btn", retrieveHistoricalData);