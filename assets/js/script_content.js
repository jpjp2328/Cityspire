// Function to toggle text (Read more...)

function toggleText() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var button = document.getElementById("button");

    if (dots.classList.contains("hidden")) {
        // Show the dots
        dots.classList.remove("hidden");

        // Hide the more text
        moreText.classList.add("hidden");

        // change text of the button
        button.innerHTML = "Read more";
    } else {
        // Hide the dots
        dots.classList.add("hidden");

        // hide the more text
        moreText.classList.remove("hidden");

        // change text of the button
        button.innerHTML = "Read less";
    }
}


// function to get current weather details
var searchFormEl = $('#searchForm')
var citySearchEl = $('#city-search');

var openWeatherMapKey = '2c4a921d55c896205bdca23294d0393d';

function citySearch(event) {
  event.preventDefault()
  callCurrentWeatherDataAPI(citySearchEl.val())
}

// call API functions
function callCurrentWeatherDataAPI(cityName) {
  var url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${openWeatherMapKey}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    console.log(data.coord.lon, data.coord.lat);
    console.log(data.sys.country);
    cityName = data.name;
    countryCode = data.sys.country;
    console.log('callCurrentWeatherDataAPI: ', cityName);
    callOneCallAPI(cityName, data.coord.lon, data.coord.lat);
    })

  return;
}

function callOneCallAPI(cityName, longitude, latitude) {
  var url = `https://api.openweathermap.org/data/2.5/onecall?units=metric&lon=${longitude}&lat=${latitude}&appid=${openWeatherMapKey}`
  fetch(url)
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    displayCurrentWeather(cityName, data.current);
    eventWidgetLocation(cityName, countryCode);
  });
}

// Function to display current city info and conditions
function displayCurrentWeather(cityName, currentWeather) {
  $('#cityName').html(cityName); // city name
  $('#currentWeatherDate').html(moment().format('M/D/YYYY')) //date
  $('#currentWeatherIcon').attr('src', `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`); //icon of weather conditions
  $('#currentWeatherTemp').html(currentWeather.temp) //temp
  $('#currentWeatherHumidity').html(currentWeather.humidity) //humidity
  $('#currentWeatherWind').html(currentWeather.wind_speed) //wind speed
  $('#currentWeatherUV').html(currentWeather.uvi) //uv index

}

// Function to change event widget detail to selected city need API with country code
function eventWidgetLocation(cityName, countryCode) {
  console.log(cityName, countryCode)
  $('#eventWidget').attr('w-city', cityName)
  $('#eventWidget').attr('w-countrycode', countryCode)

}


// initialize events
function init() {
  searchFormEl.submit(citySearch)
}

init()