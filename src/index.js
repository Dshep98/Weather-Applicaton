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

//Bonus Feature #3
//Display a fake temperature (i.e 17) in Celsius and add a link to
//convert it to Fahrenheit. When clicking on it, it should convert
//the temperature to Fahrenheit. When clicking on Celsius, it
//should convert it back to Celsius.

//When celsius is clicked its converted from Fahrenheit to celsius
function ConvertToC(event) {
  event.preventDefault();
  let temp = document.querySelector(".current");
  // let Ftemp = temp.innerHTML;
  // //°C = (°F - 32) x 5 ÷ 9
  // let convertFtoC = Math.floor(((Ftemp - 32) * 5) / 9);
  temp.innerHTML = `24℃`;
  //return temp.innerHTML;
}
let element = document.querySelector("#celsius");
element.addEventListener("click", ConvertToC);
//When fahrenheit is clicked its converted from celsius to fahrenheit
function ConvertToF(event) {
  //°F=C x 9 ÷ 5 + 32
  event.preventDefault();
  let temp = document.querySelector(".current");
  // let temp2 = temp.innerHTML;
  // let convertCtoF = Math.floor(temp2 * 1.8 + 32);
  temp.innerHTML = `76℉`;
  //return temp.innerHTML;
}

element = document.querySelector("#Fahrenheit");
element.addEventListener("click", ConvertToF);

//Bonus Point #5
//Add a Current Location button. When clicking on it,
//it uses the Geolocation API to get your GPS coordinates
//and display the city and current temperature using the OpenWeather API.
function currentLocationButton() {
  function ShowLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "imperial";
    let apiKey = "470566c1acab67fed5787c420158691b";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    //console.log(apiURL);
    axios.get(apiURL).then(ShowTemp);
  }
  navigator.geolocation.getCurrentPosition(ShowLocation);
  function ShowTemp(response) {
    console.log(response);
    let location = document.querySelector("h2");
    location.innerHTML = response.data.name;
    //console.log(location.innerHTML);

    let weather = document.querySelector(".current");
    weather.innerHTML = Math.floor(response.data.main.temp);

    console.log(weather.innerHTML);
  }
}
let button = document.querySelector("#current-city");
button.addEventListener("click", currentLocationButton);
