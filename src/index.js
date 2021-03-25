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
//This function displays all the features that come with the city.
//It produces the temperature, Date, weather description/icons, Highs/Lows, and Wind/Humidity;
function ShowCityTemp(response) {
  let location = document.querySelector("h2");
  let FullDate = document.querySelector("#full-date");
  let month = update.getMonth() + 1;
  let Day = update.getDate();
  let year = update.getFullYear();
  let fullDate = `${month}/${Day}/${year}`;
  let dateElement = document.querySelector("#time");
  let wind = document.querySelector("#wind");
  //let windDirect = document.querySelector("#direction");
  let precip = document.querySelector("#precip");
  let temp = document.querySelector(".current");
  let iconElement = document.querySelector("#icon");
  let iconInfo = document.querySelector("#iconInfo");
  let iconID = response.data.weather[0].icon;
  //Added in highs/lows for celsius once its clicked.
  let highTemp = document.querySelector("#high");
  let lowTemp = document.querySelector("#low");
  FahrenheitTemp = response.data.main.temp;
  HighTemp = response.data.main.temp_max;
  LowTemp = Math.round(response.data.main.temp_min);
  ////////////////////////////////////////////////////
  location.innerHTML = response.data.name;
  temp.innerHTML = Math.round(FahrenheitTemp);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  FullDate.innerHTML = fullDate;
  wind.innerHTML = Math.round(response.data.wind.speed);
  precip.innerHTML = response.data.main.humidity;
  //windDirect.innerHTML = response.data.wind.deg;
  //console.log(windDirect.innerHTML);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconID}@2x.png`
  );
  iconInfo.innerHTML = response.data.weather[0].description;
  highTemp.innerHTML = Math.round(HighTemp);
  lowTemp.innerHTML = Math.round(LowTemp);
  //FUnction Calls for Funny sayings function
  let Ftemp = temp.innerHTML;
  Funny(Ftemp);
  let InfoIcon = iconInfo.innerHTML;
  FunnyPT2(InfoIcon);
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


//This function dispalys the forecast in three hour increments from the current time.
//Then displays time, temperature, the temp icon, and highs and lows.
function ShowForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index <= 4; index++) {
    forecast = response.data.list[index];
    ForecastTemp = Math.round(forecast.main.temp);
    ForecastHigh = Math.round(forecast.main.temp_max);
    ForecastLow = Math.round(forecast.main.temp_min);
    forecastElement.innerHTML += `
  <div class="col-2">
  <div class="D1-card">
    <div class="D-body">
       ${FormatHours(forecast.dt * 1000)}<br /> 
       <span class=temp2>
      ${ForecastTemp}°
      </span> <br />
      ${response.data.list[0].weather[0].description} <br />
      <img
      src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
      <br />
      <br/>
      H: <strong id="high2"> ${ForecastHigh}°</strong> 
      L: <span id="low2"> ${ForecastLow}°</span>
    </div>
  </div>`;
  }
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


// FUnction converts the fahrenheit temp to celsius once its clicked.
//Its done for Today's temp, highs/lows of todays temp, and the temps from the forecast.
function ConvertToC(event) {
  event.preventDefault();
  //fix switching
  // Felement.classList.remove("active");
  // Celement.classList.add("active");
  //°C = (°F - 32) x 5 ÷ 9
  let tempElement = document.querySelector(".current");
  let Ctemp = ((FahrenheitTemp - 32) * 5) / 9;
  let HighCTemp = ((HighTemp - 32) * 5) / 9;
  let LowCTemp = ((LowTemp - 32) * 5) / 9;
  let ForeTemp = ((ForecastTemp - 32) * 5) / 9;
  let ForeHighC = ((ForecastHigh - 32) * 5) / 9;
  let ForeLowC = ((ForecastLow - 32) * 5) / 9;
  tempElement.innerHTML = Math.round(Ctemp);
  //when cel is clicked turn low and high temps to celsius
  let HighElement = document.querySelector("#high");
  HighElement.innerHTML = Math.round(HighCTemp);
  let LowElement = document.querySelector("#low");
  LowElement.innerHTML = Math.round(LowCTemp);
  let Temp2Element = document.querySelector(".temp2");
  Temp2Element.innerHTML = Math.round(ForeTemp);
  let ForeHighElement = document.querySelector("#high2");
  ForeHighElement.innerHTML = Math.round(ForeHighC);
  let ForeLowElement = document.querySelector("#low2");
  ForeLowElement.innerHTML = Math.round(ForeLowC);
}
//GLobal declared vairables to access the temperature from the city that was searched.
let FahrenheitTemp = null;
let HighTemp = null;
let LowTemp = null;
let ForecastTemp = null;
let ForecastHigh = null;
let ForecastLow = null;
//This function converts the celsius temperature back to Fahrenheit once its clicked.
//Its done for Today's temp, highs/lows of todays temp, and the temps from the forecast.
function ConvertToF(event) {
  event.preventDefault();
  //Felement.classList.add("active");
  //Celement.classList.remove("active");
  let tempElement = document.querySelector(".current");
  tempElement.innerHTML = Math.round(FahrenheitTemp);
  let HighElement = document.querySelector("#high");
  HighElement.innerHTML = Math.round(HighTemp);
  let LowElement = document.querySelector("#low");
  LowElement.innerHTML = Math.round(LowTemp);
  let Temp2Element = document.querySelector(".temp2");
  Temp2Element.innerHTML = Math.round(ForecastTemp);
  let ForeHighElement = document.querySelector("#high2");
  ForeHighElement.innerHTML = Math.round(ForecastHigh);
  let ForeLowElement = document.querySelector("#low2");
  ForeLowElement.innerHTML = Math.round(ForecastLow);
}

let Felement = document.querySelector("#celsius");
Felement.addEventListener("click", ConvertToC);

let Celement = document.querySelector("#Fahrenheit");
Celement.addEventListener("click", ConvertToF);

//Funny southern sayings that change according to temperature or temperature description.
//THESE ARE BY TEMPERATURE
function Funny(temp) {
  let FunSay = document.querySelector(".funny-body");
  if (temp >= 95) {
    FunSay.innerHTML =
      "Its so hot you finna sweat more than a sinner in church on Sunday 😂.";
  } else if (temp >= 80 && temp < 95) {
    FunSay.innerHTML =
      "Its hotter than four fat chicks sitting in the car with the windows rolled up😂";
  } else if (temp <= 79 && temp >= 70) {
    FunSay.innerHTML =
      "Well butter my butt  and call me a biscuit! Y'all got some good weather out there today!😎😎";
  } else if (temp <= 69 && temp >= 46) {
    FunSay.innerHTML =
      "THis weather so cool it doesn't know if should be Kool with a K or Cool with a C. 👀";
  } else if (temp <= 45 && temp >= 36) {
    FunSay.innerHTML =
      "its so cold, I saw a politican with his hands in his own pockets🥶🤣😂";
  } else if (temp <= 35) {
    FunSay.innerHTML =
      "its so damn cold outside i just farted snowflakes🥶🤣😂";
  }
}
//THESE ARE BY DESCRIPTION
function FunnyPT2(info) {
  let FunSay = document.querySelector(".funny-body");
  if (info === "rain" || info === "light rain" || info === "heavy rain") {
    FunSay.innerHTML = "its raining like a cow pissing on a flat rock ☔";
  } else if (info === "thunderstorm") {
    FunSay.innerHTML =
      "Its raining cats and dogs out there. Get somewhere and sat down and let the lord do his part. 🙃😲😩";
  } else if (info === "snow") {
    FunSay.innerHTML =
      "I heard its snowing this weekend, but I'm from the south so that's none of my business 🐸☕.";
  }
}