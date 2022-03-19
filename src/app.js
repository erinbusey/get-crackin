const apiKey = "a22a698f45541df9c65139ef895958ef\n";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

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

    let dateElement = document.querySelector("#dateTime");
    dateElement.innerHTML = formatDate(response.data.dt*1000);
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



axios.get(apiUrl).then(displayTemperature);


