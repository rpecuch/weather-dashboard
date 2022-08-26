var cityInputEl = document.querySelector("#city-input");
var submitBtn = document.querySelector("#submit-btn");
var errorEl = document.querySelector("#error-message");

function handleSubmitForm(event) {
    event.preventDefault();
    var cityInput = cityInputEl.value
    if(cityInput === "") {
        errorEl.textContent = "Please type a city name!"
        //run function to retrieve data
    }
    else {
        errorEl.textContent = "";
    }
}

submitBtn.addEventListener("click", handleSubmitForm);