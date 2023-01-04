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
    if(localStorage.length > 0) {
        //add btns for past searches
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            var historyListEl = document.createElement("li");
            var historyButton = document.createElement("button");
            historyButton.textContent = key;
            historyButton.setAttribute("class", "history-btn")
            historyListEl.append(historyButton);
            historyContainer.append(historyListEl);
          }
          var clearBtn = document.createElement('button');
          clearBtn.textContent = 'Clear Search History';
          clearBtn.setAttribute('class', 'btn clear-btn')
          //clear search history and reloads page
          clearBtn.addEventListener('click', function() {
            localStorage.clear();
            location.reload();
          })
          //add clear search history btn
          historyContainer.append(clearBtn);
    }
    //no past searches
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
    //select correct city
    cityBtnEl = event.target;
    //construct query string
    var historicalInput = cityBtnEl.textContent.toLowerCase();
    var historicalQueryString = "./search-results.html?q=" + historicalInput;
    //redirect to search
    location.assign(historicalQueryString);
}

//conducts search when a historical city is clicked on
historyContainer.on("click", ".history-btn", retrieveHistoricalData);