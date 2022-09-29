// Countries to exclude from the homepage images (they have bugs/don't load)
const ignorePlaces = [
    'Latvia', 'Venezuela', 'Eswatini', 'Heard Island and McDonald Islands', 'Mali', 'United States Minor Outlying Islands', 'Vietnam', 'North Macedonia', 'Panama', 'United States Virgin Islands', 'Kuwait', 'Tokelau',
    'Saint Helena, Ascension and Tristan da Cunha', 'Algeria', 'Guam', 'British Indian Ocean Territory', 'Slovakia', 'Jordan', 'Guinea',  'French Polynesia', 'Philippines', 'Chile', 'Bouvet Island', 'Libya',
    'North Korea', 'Turks and Caicos Islands', 'Equatorial Guinea', 'Faroe Islands', 'Bosnia and Herzegovina'];

let photosReady = 0;
/** Google places API object */
let placesService;
// Fill out city name in search bar when you begin typing
function initAutocomplete() {
    const input = document.getElementById("city-search");
    
    const options = {
        fields: ["name"],
        strictBounds: false,
        // Only show cities
        types: ["(cities)"]
    };
    
    // Connect search bar to the autocomplete API
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    
    // Trigger function when the text is clicked
    autocomplete.addListener("place_changed", () => {
        
        const place = autocomplete.getPlace();
        // Redirect to the details page of the place the user selected
        // Replace spaces in place name so content page can load information
        document.location = `content.html?location=${place.name.replace(/ /g,',')}`;
    });
    
    placesService = new google.maps.places.PlacesService(document.createElement('div'));
    
    const photo1 = document.getElementById('home-photo1');
    const photo2 = document.getElementById('home-photo2');
    const photo3 = document.getElementById('home-photo3');
    // Display 3 random destinations when the page loads
    randomPlaces(photo1, photo2, photo3);
    
    // Check every 100ms if all images have been loaded
    let photoInterval = setInterval(function() {
        if(photosReady < 3) { return; }
        if(photo1.complete && photo2.complete && photo3.complete) {
            // Show image container if all images have loaded
            document.getElementById('home-photos').classList.remove('opacity-0');
            // Stop checking if images have loaded
            clearInterval(photoInterval);
        }
    }, 100)
}

/**
* Get photos for a place and assign one of them to the img tag provided
* @param {string} placeId Identifier for the place found from the Google API
* @param {HTMLImageElement} photoEl Element to assign the image to
*/
function getPlaceInfo(placeId, photoEl) {
    const request = {
        placeId,
        // Retrieve name and photos of the place
        fields: ['name', 'photos']
    };
    
    // Handle response from places API for photos
    function callback(place, status) {
        // Make sure a valid response was received
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            // If the place has no photos, get a new random place
            if(place.photos == null) {
                return randomPlace(photoEl);
            }
            // Use first photo of the place
            const imgUrl = (place.photos[0].getUrl());
            // Attach image to photo element
            photoEl.src = imgUrl;
            // Add a caption with the name of the place 
            photoEl.nextElementSibling.innerHTML = place.name;
            // Make photo clickable to take you to the details page of the place
            photoEl.onclick = function() {
                document.location = `content.html?location=${place.name}`
            }
            // Increment the number of photos that have loaded
            photosReady++;
        }
    }
    // Request place details from Google API
    placesService.getDetails(request, callback);
}

/**
* Get id of a place and call getPlaceInfo to also get the image
* @param {string} placeName Name of place to search for the id of
* @param {HTMLImageElement} photoEl Element to assign the image to
*/
async function findPlace(placeName, photoEl) {
    const cities = await getCitiesForCountry(placeName);
    if (cities.length === 0) {
        return randomPlace(photoEl);
    }
    const request = {
        query: cities[0],
        // Retrieve id of the place
        fields: ['place_id'],
    };
    
    // Handle response from places API for place id
    function callback(results, status) {
        // Receive new place if the requested place has no images
        if (results == null) {
            return randomPlace(photoEl)
        }
        // Make sure a valid response was received
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Use first id of the place
            getPlaceInfo(results[0].place_id, photoEl)
        }
    }
    // Call Google API to find place id
    placesService.findPlaceFromQuery(request, callback);
}

// API url to get list of countries
const countryRequestUrl = 'https://restcountries.com/v3.1/all';

// Gets list of countries and saves it to local storage
async function getCountryList() {
    let countryList = JSON.parse(localStorage.getItem('countryList') || '[]');
    // Check for saved countries
    if(countryList.length === 0) {
        // Wait for countries to be returned from the API and then save them to local storage
        await fetch(countryRequestUrl)
        .then(function (response) { return response.json(); })
        .then(function(data) {
            // Convert country objects to names only
            countryList = data.map((country) => country.name.common);
            // Save list of countries to local storage
            localStorage.setItem('countryList', JSON.stringify(countryList));
        });
    }
    return countryList.filter((country)=> !ignorePlaces.includes(country));
}

/**
* Find 3 random images and attach them to the img tags
* @param {HTMLImageElement} photoEl1 First element to add image to
* @param {HTMLImageElement} photoEl2 Second element to add image to
* @param {HTMLImageElement} photoEl3 Third element to add image to
*/
async function randomPlaces(photoEl1, photoEl2, photoEl3) {
    // Loading the saved list of countries if it has been saved
    let list = await getCountryList();
    
    // Pick a random country from the list of countries
    const randomCountry1 = list[Math.floor(Math.random() * list.length)];
    // Remove picked country from list
    list = list.filter((country)=> country !== randomCountry1);
    const randomCountry2 = list[Math.floor(Math.random() * list.length)];
    list = list.filter((country)=> country !== randomCountry2);
    const randomCountry3 = list[Math.floor(Math.random() * list.length)];
    console.log(randomCountry1, randomCountry2, randomCountry3);
    // Get place information and images for the three random countries
    findPlace(randomCountry1, photoEl1);
    findPlace(randomCountry2, photoEl2);
    findPlace(randomCountry3, photoEl3);
}

// Pick a new random place if the requested place has no images
async function randomPlace(photoEl1) {
    const list = await getCountryList();
    
    // Pick a random country from the list of countries
    const randomCountry1 = list[Math.floor(Math.random() * list.length)];
    // Get place information and images for a random country
    findPlace(randomCountry1, photoEl1);
}
// API url to get list of cities in a country
const citiesAPIUrl = 'https://api.teleport.org/api/cities/';

/**
* Get a list of city names in a provided country
* @param {string} country The country to get the cities for
* @returns The list of cities in the country
*/
async function getCitiesForCountry(country) {
    const data = await fetch (`${citiesAPIUrl}?search=${country}`)
    .then(function (response) { return response.json(); })
    const names = data._embedded['city:search-results'].map((city)=>city.matching_full_name);
    return names;
}

window.onload = function() {
    var destinationBtn = document.getElementById('destinationBtn');
    var destinationContent = document.getElementById('destinationContent');
    var closeBtn = document.getElementById('closeBtn');
    var overlay = document.getElementById('overlay');
    var topCity1Btn = document.getElementById('topCity1Btn')
    var topCity2Btn = document.getElementById('topCity2Btn')
    var topCity3Btn = document.getElementById('topCity3Btn')
    var topCity4Btn = document.getElementById('topCity4Btn')
    var topCity5Btn = document.getElementById('topCity5Btn')
    
    destinationBtn.addEventListener('click', function () {
        destinationContent.classList.remove('hidden');
        overlay.classList.remove('hidden');
    });
    
    closeBtn.addEventListener('click', function () {
        destinationContent.classList.add('hidden');
        overlay.classList.add('hidden');
    });
    
    topCity1Btn.addEventListener('click', function () {
        document.location = `content.html?location=${this.innerHTML}`
    })
    
    topCity2Btn.addEventListener('click', function () {
        document.location = `content.html?location=${this.innerHTML}`
    })
    
    topCity3Btn.addEventListener('click', function () {
        document.location = `content.html?location=${this.innerHTML}`
    })
    
    topCity4Btn.addEventListener('click', function () {
        document.location = `content.html?location=${this.innerHTML}`
    })
    
    topCity5Btn.addEventListener('click', function () {
        document.location = `content.html?location=${this.innerHTML}`
    })
    
}

