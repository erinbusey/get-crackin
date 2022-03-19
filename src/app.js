const apiKey = "a22a698f45541df9c65139ef895958ef\n";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

getCurrentPosition();

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition)
}
function showPosition(position) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;
    axios.get(apiUrl).then(displayCity);
}
function displayCity(response) {
    let cityName = document.querySelector("#cityName");
    cityName.innerHTML = response.data.name;
}


let formElement = document.querySelector("#locationForm");
formElement.addEventListener("submit", showCityWeather);
function showCityWeather (event) {
    event.preventDefault();
    let city = document.querySelector("#cityInput").value;
    console.log(city);
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}


function displayTemperature(response) {
    console.log(response);
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
    dateElement.innerHTML = formatDate(response.data.dt*1000);

    // Set Icon
    let iconElement = document.querySelector("#iconMain");
    iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function formatDate(timeStamp) {
    let date = new Date(timeStamp);
    console.log(date);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();

    return `${day} ${hours}:${minutes}`;
}





