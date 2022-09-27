
// function to get current weather details
const searchFormEl = $('#searchForm')
let citySearchEl = ""


// grab the url
let url = window.location.href
console.log(url)

const urlStart = url.indexOf('=')

const urlEnd = url.indexOf(',')

console.log(urlStart)

console.log(urlEnd)

console.log(url.substring(urlStart + 1))

/*
const getCityFromUrl = () => {
  // if the url doesnt have a comma 
  if () {

  }

}
*/

let map;

const openWeatherMapKey = '2c4a921d55c896205bdca23294d0393d';
const googleKey = 'AIzaSyA2SZRWK-idQmJ5RiyvTjZsGzLhm3W_XAg'

function citySearch(event) {
  
  citySearchEl = citySearchEl ? citySearchEl : $('#city-search').val()

  console.log("HEREEEE",citySearchEl)

  if (citySearchEl === '') {
    return
  } 

  if (event) {
    event.preventDefault();
  } 
  

  callCurrentWeatherDataAPI(citySearchEl)

  console.log(citySearchEl)

  loadMap();

  loadWiki();
  
  citySearchEl = null
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
    displaySearchHistory(cityName, false)
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

// https://developers.google.com/maps/documentation/javascript
// https://developers.google.com/maps/documentation/geocoding/start

const loadMap = () => {

  let url2 = `https://maps.googleapis.com/maps/api/geocode/json?address=${citySearchEl}&key=${googleKey}`;

  fetch(url2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);

      generateMap(data)
    });
}

const generateMap = (data) => {
  // Create the script tag, set the appropriate attributes
  let script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${googleKey}&callback=initMap`;
  script.async = true;

  let lat = data.results[0].geometry.location.lat;
  let lng = data.results[0].geometry.location.lng;

  console.log(lat);
  console.log(lng);

  // Attach your callback function to the `window` object
  window.initMap = function() {
    // JS API is loaded and available
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: lat, lng: lng },
      zoom: 12,
    });
  };

  // Append the 'script' element to 'head'
  document.head.appendChild(script);
}

// https://www.mediawiki.org/wiki/API:Main_page
// https://www.youtube.com/watch?v=RPz75gcHj18
// https://www.youtube.com/watch?v=yqwHxAH1xrw

const loadWiki = () => {

  // Will need to replay spaces and commas with underscores
  // 

    let infoURL = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=1200&format=json&origin=*&titles=${citySearchEl}`

  console.log(infoURL)

  fetch(infoURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);

      let page = data.query.pages;
      let pageID = Object.keys(data.query.pages)[0];
      // let content = page[pageID].revisions[0]['*'];
      let content = page[pageID].extract;

      console.log(content);

      document.getElementById('content').innerHTML = content

    });

}

// Local Storage Search history

const searchHistoryEl = $('#searchHistory')

function displaySearchHistory(cityName, initialStart) {

  $('#searchHistory').attr('style', '""');
  var matchFound = false;
  $('#searchHistory').children('').each(function(i) {
      if (cityName == $(this).text()) {
          matchFound = true;
          return;
      }
  });
  if (matchFound) {return;}

  var buttonEl = $(`<button class="mt-3 w-40 px-2 py-2 bg-gray-500 text-white rounded duration-300 hover:bg-gray-700">${cityName}</button>`)
  buttonEl.on('click', previousButtonClick);
  buttonEl.prependTo(searchHistoryEl);

  if (!initialStart) {savePreviousData(cityName)};
}

function savePreviousData(cityName) {
  tempItem = JSON.parse(localStorage.getItem('searchHistory'))
  if (tempItem != null) {
      localStorage.setItem('searchHistory', JSON.stringify(tempItem.concat(cityName)))
  } else {
      tempArr = [cityName];
      localStorage.setItem('searchHistory', JSON.stringify(tempArr))
  }
}

function previousButtonClick(event) {
  callCurrentWeatherDataAPI(event.target.innerHTML);
  // THIS DOESNT WORK
  loadWiki();
}

// Clear History Function

/* const clearHistoryBtn = $('#clearHistoryBtn')

clearHistoryBtn.addEventListener("click", () => {
  localStorage.clear();
  searchHistoryEl = [];
  citySearch.value = "";

});
 */

// initialize events
function init() {
  
  if (document.location.search.length > 1) {

    citySearchEl = document.location.search.split("=")[1].split(",")[0]

    citySearch()
    // document.location.search = ''
  }
  
  
  searchFormEl.submit(citySearch)

  tempArr = JSON.parse(localStorage.getItem('searchHistory'))
  if (tempArr != null){
    for (let index = 0; index < tempArr.length; index++) {
      displaySearchHistory(tempArr[index], true)
    }
  }

}

init()

//if there's a query string, then execute4 function search