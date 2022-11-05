var cityInputEl = document.querySelector("#city-input");
var searchFormEl = document.querySelector("#form");
var errorEl = document.querySelector("#error-message");
var historyContainer = $(".history-content");
var historyCard = document.querySelector("#history-card")

//redirects to search results page upon submitting form
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

//retrieves search history from local storage and displays it to the page when page loads
function retrievePastSearches() {
    let storedSearches = JSON.parse(localStorage.getItem("pastSearches"));
    if(storedSearches !== null) {
        for(i=0; i<storedSearches.length; i++) {
            var historyListEl = document.createElement("li");
            var historyButton = document.createElement("button");
            historyButton.textContent = storedSearches[i].city;
            historyButton.setAttribute("class", "history-btn")
            historyListEl.append(historyButton);
            historyContainer.append(historyListEl);
        }

    }
    else {
        var noHx = document.createElement('p');
        noHx.textContent = 'No recent searches!'
        historyContainer.append(noHx)
    }
}

retrievePastSearches();

//redirects to search results when user clicks on city from search history
function retrieveHistoricalData(event) {
    event.preventDefault();
    cityBtnEl = event.target;
    var historicalInput = cityBtnEl.textContent.toLowerCase();
    var historicalQueryString = "./search-results.html?q=" + historicalInput;
    location.assign(historicalQueryString);
}


historyContainer.on("click", ".history-btn", retrieveHistoricalData);