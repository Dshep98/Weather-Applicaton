//GLobal declared vairables for api urls
let units = "imperial";
let apiKey = "470566c1acab67fed5787c420158691b";

//Default Forecast
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
for (let index = 0; index <= 4; index++) {
  forecastElement.innerHTML += `<div class="col-2">
<div class="D1-card">
  <div class="D-body">
    Day 1:<br />
    65° <br />
    Rain <br />
    🌧<br />
    H: 75° L: 55°
  </div>
</div>
</div>`;
}
//Days array to access the day of the week by name.
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let update = new Date();
//Day and Time Format for Todays Date.
function formatDate(time) {
  update = new Date(time);
  let day = update.getDay();
  return ` ${days[day]} | ${FormatHours(update)} `;
}
//This function takes in the timestamp of the city and formats it.
function FormatHours(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let min = time.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  return ` ${hours}:${min} `;
}

//Change city function seraches for the city entered by the user using the weather API.
function change_city(event) {
  event.preventDefault();
  let findcity = document.querySelector("#city-input");
  let foundcity = document.querySelector("h2");
  foundcity.innerHTML = `${findcity.value.toUpperCase()}`;
  let city = findcity.value;
  let findCity = city;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${findCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(ShowCityTemp);
  //this portion is for forecast
  apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${findCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(ShowForecast);
}
let form = document.querySelector(".form");
form.addEventListener("submit", change_city);

//Location functions uses the Geolocation Api and searches by the given coordinates of the longitude and Latitude.
function location(event) {
  event.preventDefault();
  function ShowLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiURL).then(ShowCityTemp);
    //this portion is for forecast
    apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiURL).then(ShowForecast);
  }
  navigator.geolocation.getCurrentPosition(ShowLocation);
}
let button = document.querySelector("#current-city");
button.addEventListener("click", location);
