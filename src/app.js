const apiKey = "a22a698f45541df9c65139ef895958ef\n";
getCurrentPosition();

// Get current position / Lat/Long
function getCurrentPosition() {
    // Get Coords from Navigator Geolocation and then execute the "showPosition" Function
    navigator.geolocation.getCurrentPosition(getCityName);
}

// Get the City Name from the openweathermap API
function getCityName(position) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;
    axios.get(apiUrl).then(displayCity);
}

// Display the City from the API Request Response in id="cityName" (HTML)
function displayCity(response) {
    let cityNameElement = document.querySelector("#cityName"); // This line gets the HTML Element into Javascript
    cityNameElement.innerHTML = response.data.name; // Here we exchange the content of the City Element with the Name of the City that we get from the API
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${response.data.name}&appid=${apiKey}&units=metric`; // Request the weather from the City Name (response.data.name)
    axios.get(apiUrl).then(displayTemperatureAndTimeAndIcon); // Make the API Call, execute function displayTemperature with the response
}

// Display Weather Info / Time / Big Icon
function displayTemperatureAndTimeAndIcon(response) {
    console.log(response);
    // Set the weather data in HTML
    let temperatureElement = document.querySelector("#bigTemp");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#cityName");
    cityElement.innerHTML = response.data.name;
    let descriptionElement = document.querySelector("#weatherDescription");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = response.data.wind.speed;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;

    // Set Date & Time
    let dateElement = document.querySelector("#dateTime");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    // Set Icon
    let iconElement = document.querySelector("#iconMain");
    iconElement.setAttribute("src",`https://vigorous-mcclintock-84a9de.netlify.app/icons/${response.data.weather[0].icon}.svg`);

    getForecast(response.data.coord);
}
// End of initial functions

// Form Submit
let formElement = document.querySelector("#locationForm");
formElement.addEventListener("submit", showCityWeather);

function showCityWeather(event) {
    event.preventDefault();
    let city = document.querySelector("#cityInput").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperatureAndTimeAndIcon);
}


// Format Date from Unix Timestamp
function formatDate(timeStamp) {
    let date = new Date(timeStamp);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();

    return `${day} ${hours}:${minutes}`;
}

// Display 7 day Forecast

function getForecast(position) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.lat}&lon=${position.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
    let forecastDays = response.data.daily;
    let forecastElement = document.querySelector("#displayForecast");
    let forecastHTML = "";
    forecastDays.forEach(function(day, index) {
        if (index <= 5){
            let dayName = getDayFromTimestamp(day.dt);
            let mathTemp = Math.round(day.temp.day);
            forecastHTML = forecastHTML + `   
                <div class="col-2">
                    <div class="weather-forecast-item">
                        <div class="item-day">
                            ${dayName}
                        </div>
                        <div class="item-icon">
                            <img src="https://vigorous-mcclintock-84a9de.netlify.app/icons/${day.weather[0].icon}.svg" width="40px">
                        </div>
                        <div class="item-temp">
                            ${mathTemp}
                        </div>
                    </div>
                </div>`;

        }

    });
    forecastElement.innerHTML = forecastHTML;
}
function getDayFromTimestamp(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let day = days[date.getDay()];
    return day;
}







