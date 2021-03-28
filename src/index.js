//GLobal declared vairables for api urls
let units = "imperial";
let apiKey = "470566c1acab67fed5787c420158691b";
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
//This function displays all the features that come with the city.
//It produces the temperature, Date, weather description/icons, Highs/Lows, and Wind/Humidity;
function ShowCityTemp(response) {
  let located_city = document.querySelector("h2");
  let FullDate = document.querySelector("#full-date");
  let month = update.getMonth() + 1;
  let Day = update.getDate();
  let year = update.getFullYear();
  let fullDate = `${month}/${Day}/${year}`;
  let dateElement = document.querySelector("#time");
  let windDirect = document.querySelector("#direction");
  let wind = document.querySelector("#wind");
  let precip = document.querySelector("#precip");
  let temp = document.querySelector(".current");
  let iconElement = document.querySelector("#icon");
  let iconInfo = document.querySelector("#iconInfo");
  let iconID = response.data.weather[0].icon;
  let highTemp = document.querySelector("#high");
  let lowTemp = document.querySelector("#low");
  let RealFeel = document.querySelector("#Real-feel");
  let sunrise = document.querySelector("#sunrise");
  let sunset = document.querySelector("#sunset");
  ////////////////////////////////////////////////////
  FahrenheitTemp = response.data.main.temp;
  HighTemp = response.data.main.temp_max;
  LowTemp = Math.round(response.data.main.temp_min);
  Feel = response.data.main.feels_like;
  located_city.innerHTML = response.data.name;
  temp.innerHTML = Math.round(FahrenheitTemp);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  FullDate.innerHTML = fullDate;
  windDirect.innerHTML = response.data.wind.deg;
  wind.innerHTML = Math.round(response.data.wind.speed);
  precip.innerHTML = response.data.main.humidity;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconID}@2x.png`
  );
  iconInfo.innerHTML = response.data.weather[0].description.toUpperCase();
  highTemp.innerHTML = Math.round(HighTemp);
  lowTemp.innerHTML = Math.round(LowTemp);
  RealFeel.innerHTML = Math.round(Feel);
  sunrise.innerHTML = FormatHours(response.data.sys.sunrise * 1000);
  sunset.innerHTML = FormatHours(response.data.sys.sunset * 1000);
  //FUnction Calls for Funny sayings function
  let Ftemp = temp.innerHTML;
  Funny(Ftemp);
  let InfoIcon = iconInfo.innerHTML;
  FunnyPT2(InfoIcon);
  //Function for wind direcitions
  let windCode = windDirect.innerHTML;
  windDirection(windCode);
  console.log(windCode);
}



//This function dispalys the forecast in three hour increments from the current time.
//Then displays time, temperature, the temp icon, and highs and lows.
function ShowForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index <= 4; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <div class="col-2">
  <div class="D1-card">
    <div class="D-body">
       ${FormatHours(forecast.dt * 1000)}<br /> 
       <span class="forecast-temp">
      ${Math.round(forecast.main.temp)}°
      </span> <br />
      ${response.data.list[0].weather[0].description} <br />
      <img
      src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
      <br />
      <br/>
      H: <strong> <span class="forecast-high">${Math.round(
        forecast.main.temp_max
      )}</span>°</strong> 
      L: <span class="forecast-low">${Math.round(
        forecast.main.temp_min
      )}</span>°
    </div>
  </div>`;
  }
}
// //Change city function seraches for the city entered by the user using the weather API.
function change_city(findCity) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${findCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(ShowCityTemp);
//this portion is for forecast
  apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${findCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(ShowForecast);

}
  function ProcessCity(event){
  event.preventDefault();
  let findcity = document.querySelector("#city-input");
  let foundcity = document.querySelector("h2");
  foundcity.innerHTML = `${findcity.value.toUpperCase()}`;
  let city = findcity.value;
  change_city(city);
  }
  

//Location functions uses the Geolocation Api and searches by the given coordinates of the longitude and Latitude.
function located_Coords(event) {
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



// FUnction converts the fahrenheit temp to celsius once its clicked.
//Its done for Today's temp, highs/lows of todays temp, and the temps from the forecast.
function ConvertToC(event) {
  event.preventDefault();
  Felement.classList.remove("active");
  Celement.classList.add("active");
  //°C = (°F - 32) x 5 ÷ 9
  let tempElement = document.querySelector(".current");
  let Ctemp = ((FahrenheitTemp - 32) * 5) / 9;
  let HighCTemp = ((HighTemp - 32) * 5) / 9;
  let LowCTemp = ((LowTemp - 32) * 5) / 9;
  let FeelCTemp = ((Feel - 32) * 5) / 9;
  tempElement.innerHTML = Math.round(Ctemp);
  //when cel is clicked turn low and high temps to celsius
  let HighElement = document.querySelector("#high");
  HighElement.innerHTML = Math.round(HighCTemp);
  let LowElement = document.querySelector("#low");
  LowElement.innerHTML = Math.round(LowCTemp);
  let FeelElement = document.querySelector("#Real-feel");
  FeelElement.innerHTML = Math.round(FeelCTemp);
  ///////////////////////////////////////////////////////////////////
  //Forecast Changes
  let forecastHigh = document.querySelectorAll(".forecast-high");
  forecastHigh.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;
    // convert to Fahrenheit
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
    // convert to Celsius
    item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });
  let forecastLow = document.querySelectorAll(".forecast-low");
  forecastLow.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;
    // convert to Celsius
    item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });
  let forecastTemp = document.querySelectorAll("forecast-temp");
  forecastTemp.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;
    console.log(currentTemp);
    // convert to Fahrenheit
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
    // convert to Celsius
    item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });
  // to avoid double conversion
  Celement.removeEventListener("click", ConvertToC);
  Felement.addEventListener("click", ConvertToF);
}
  

//This function converts the celsius temperature back to Fahrenheit once its clicked.
//Its done for Today's temp, highs/lows of todays temp, and the temps from the forecast.
function ConvertToF(event) {
  event.preventDefault();
  Felement.classList.add("active");
  Celement.classList.remove("active");
  let tempElement = document.querySelector(".current");
  tempElement.innerHTML = Math.round(FahrenheitTemp);
  let HighElement = document.querySelector("#high");
  HighElement.innerHTML = Math.round(HighTemp);
  let LowElement = document.querySelector("#low");
  LowElement.innerHTML = Math.round(LowTemp);
  let FeelElement = document.querySelector("#Real-feel");
  FeelElement.innerHTML = Math.round(Feel);
  /////////////////////////////////////////////////////////////////////////////
  ///Forecast changes
  let forecastHigh = document.querySelectorAll(".forecast-high");
  forecastHigh.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;
    // convert to Fahrenheit
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });
  let forecastLow = document.querySelectorAll(".forecast-low");
  forecastLow.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;
    // convert to Fahrenheit
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });
  let forecastTemp = document.querySelectorAll(".forecast-temp");
  forecastTemp.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;
    // convert to Fahrenheit
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });
  // to avoid double conversion
  Celement.addEventListener("click", ConvertToC);
  Felement.removeEventListener("click", ConvertToF);

}
//Funny southern sayings that change according to temperature or temperature description.
//THESE ARE BY TEMPERATURE
function Funny(temp) {
  let FunSay = document.querySelector(".funny-body");
  if (temp >= 95) {
    FunSay.innerHTML =
      "It's so hot you finna sweat more than a sinner in church on Sunday. 😂";
  } else if (temp >= 80 && temp < 95) {
    FunSay.innerHTML =
      "It's hotter than four fat chicks sitting in the car with the windows rolled up.🥵🤣";
  } else if (temp <= 79 && temp >= 70) {
    FunSay.innerHTML =
      "Well butter🧈 my butt and call me a biscuit🍪! Y'all got some good weather out there today!😎😎";
  } else if (temp <= 69 && temp >= 46) {
    FunSay.innerHTML =
      "This weather so cool it doesn't know if should be Kool with a K or Cool with a C! 😎";
  } else if (temp <= 45 && temp >= 36) {
    FunSay.innerHTML =
      "It's so cold 🥶 I saw a politican with his hands in his own pockets.🤣😂";
  } else if (temp <= 35) {
    FunSay.innerHTML =
      "It's so damn cold 🥶 outside you can fart snowflakes.🤣😂";
  }
}
//THESE ARE BY DESCRIPTION
function FunnyPT2(info) {
  let FunSay = document.querySelector(".funny-body");
  if (info === "rain" || info === "light rain" || info === "heavy rain") {
    FunSay.innerHTML = "It's raining ☔ like a cow 🐄 pissing on a flat rock.🤣 ";
  } else if (info === "thunderstorm" || info==="thunderstorm with rain"|| info==="light thunderstorm") {
    FunSay.innerHTML =
      "Its raining cats 🐈 and dogs 🐕‍🦺 out there. Get somewhere and sat down and let the lord do his part. 🙃😲😩";
  } else if (info === "snow") {
    FunSay.innerHTML =
      "I heard its snowing this weekend, but I'm from the south so that's none of my business 🐸☕.";
  }
}
//This function is used to determine the direction of the wind 
//in terms on North,South,East,or West and matches it with the specified code thats passed in.
//it goes down the line to make comparisons and if it matches it sets the innerHTML to what the code matched with.
function windDirection(windCode) {
  let windDirect = document.querySelector("#direction");
  if (windCode >= 11.25 && windCode <= 33.75) {
    windCode = "NNE";
    windDirect.innerHTML = windCode;
  } else if (windCode >= 33.75 && windCode <= 56.25) {
    windCode = "NNE";
    windDirect.innerHTML = windCode;
  } else if (windCode >= 56.25 && windCode <= 78.75) {
    windCode = "ENE";
    windDirect.innerHTML = windCode;
  } else if (windCode >= 78.75 && windCode <= 101.25) {
    windCode = "E";
    windDirect.innerHTML = windCode;
  } else if (windCode >= 101.25 && windCode <= 123.75) {
    windCode = "ESE";
    windDirect.innerHTML = windCode;
  } else if (windCode >= 123.75 && windCode <= 146.25) {
    windCode = "SE";
    windDirect.innerHTML = windCode;
  } else if (windCode >= 146.25 && windCode <= 168.75) {
    windCode = "SSE";
    windDirect.innerHTML = windCode;
  } else if (windCode >= 168.75 && windCode <= 191.25) {
    windCode = "S";
    windDirect.innerHTML = windCode;
  } else if (windCode >= 191.25 && windCode <= 213.75) {
    windCode = "SSW";
    windDirect.innerHTML = windCode;
  } else if (windCode >= 213.75 && windCode <= 236.25) {
    windCode = "SW";
    windDirect.innerHTML = windCode;
  } else if (windCode >= 236.25 && windCode <= 258.75) {
    windCode = "WSW";
    windDirect.innerHTML = windCode;
  } else if (windCode >= 258.75 && windCode <= 281.25) {
    windCode = "W";
    windDirect.innerHTML = windCode;
  } else if (windCode >= 281.25 && windCode <= 303.75) {
    windCode = "WNW";
    windDirect.innerHTML = windCode;
  } else if (windCode >= 303.75 && windCode <= 326.25) {
    windCode = "NW";
    windDirect.innerHTML = windCode;
  } else if (windCode >= 326.25 && windCode <= 348.75) {
    windCode = "NNW";
    windDirect.innerHTML = windCode;
  } else {
    windCode = "N";
    windDirect.innerHTML = windCode;
  }
}

//GLobal declared vairables to access the temperature from the city that was searched.
let FahrenheitTemp = null;
let HighTemp = null;
let LowTemp = null;
let Feel = null;
let form = document.querySelector(".form");
form.addEventListener("submit", ProcessCity);

let button = document.querySelector("#current-city");
button.addEventListener("click", located_Coords);

let Celement = document.querySelector("#celsius");
Celement.addEventListener("click", ConvertToC);

let Felement = document.querySelector("#Fahrenheit");
Felement.addEventListener("click", ConvertToF);

change_city("Dominican Republic");

