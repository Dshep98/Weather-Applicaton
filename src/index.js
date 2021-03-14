//Feature 1 Add day and time Format: Tuesday 17:45
function Dateformated(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let dateDay = date.getDay();
  return ` ${days[dateDay]} | ${hours}:${min} `;
}
let date = new Date();
let current = Dateformated(date);
let time = document.querySelector(".time");
time.innerHTML = current;
//Feature 2 Add a search engine, when searching for a city
//(i.e. Paris), display the city name on the page after
//the user submits the form
function change_city(event) {
  event.preventDefault();
  let findcity = document.querySelector("#city-input");

  //console.log(findcity.value);
  let foundcity = document.querySelector("h2");

  foundcity.innerHTML = `${findcity.value.toUpperCase()}`;
  //Feature 4
  // when a user searches for a city (example: New York),
  //it should display the name of the city on the result page and the
  //current temperature of the city.
  let city = findcity.value;
  //console.log(city);
  let findCity = city;
  let units = "imperial";
  let apiKey = "470566c1acab67fed5787c420158691b";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${findCity}&appid=${apiKey}&units=${units}`;
  function ShowCityTemp(response) {
    console.log(response);
    let temp = document.querySelector(".current");
    temp.innerHTML = Math.floor(response.data.main.temp);
    //Possibly othr features
    //let highTemp = document.querySelector(".high");
    //highTemp.innerHTML = Math.floor(response.data.main.temp_max);
    //let low = document.querySelector(".low");
    //low.innerHTML = Math.floor(response.data.main.temp_min);
  }

  axios.get(apiURL).then(ShowCityTemp);
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
