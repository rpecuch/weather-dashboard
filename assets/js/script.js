var cityInputEl = document.querySelector("#city-input");
var searchFormEl = document.querySelector("#form");
var errorEl = document.querySelector("#error-message");
var historyContainer = $(".history-content");

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
            historyContainer.append(historyListEl);
        }

    }
}

retrievePastSearches();

function retrieveHistoricalData(event) {
    event.preventDefault();
    cityBtnEl = event.target;
    var historicalInput = cityBtnEl.textContent.toLowerCase();
    var historicalQueryString = "./search-results.html?q=" + historicalInput;
    location.assign(historicalQueryString);
}


historyContainer.on("click", ".history-btn", retrieveHistoricalData);