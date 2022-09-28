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
        document.location = `content.html?location=${place.name}`
    });
    
    placesService = new google.maps.places.PlacesService(document.createElement('div'));
    
    // Display 3 random destinations when the page loads
    randomPlaces(document.getElementById('home-photo1'), document.getElementById('home-photo2'), document.getElementById('home-photo3'));
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
function findPlace(placeName, photoEl) {
    const request = {
        query: placeName,
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

/**
* Find 3 random images and attach them to the img tags
* @param {HTMLImageElement} photoEl1 First element to add image to
* @param {HTMLImageElement} photoEl2 Second element to add image to
* @param {HTMLImageElement} photoEl3 Third element to add image to
*/
function randomPlaces(photoEl1, photoEl2, photoEl3) {
    // Loading the saved list of countries if it has been saved
    let countryList = JSON.parse(localStorage.getItem('countryList') || '[]');
    // Check for saved countries
    if(countryList.length === 0) {
        // TODO: Make sure country list is received before adding images to page
        fetch(countryRequestUrl)
        .then(function (response) { return response.json(); })
        .then(function(data) {
            // Convert country objects to names only
            countryList = data.map((country) => country.name.common);
            // Save list of countries to local storage
            localStorage.setItem('countryList', JSON.stringify(countryList));
        });
    }
    
    let list = countryList;
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
function randomPlace(photoEl1) {
    // Loading the saved list of countries if it has been saved
    let countryList = JSON.parse(localStorage.getItem('countryList') || '[]');
    // Check for saved countries
    if(countryList.length === 0) {
        fetch(countryRequestUrl)
        .then(function (response) { return response.json(); })
        .then(function(data) {
            // Convert country objects to names only
            countryList = data.map((country) => country.name.common);
            // Save list of countries to local storage
            localStorage.setItem('countryList', JSON.stringify(countryList));
        });
    }
    
    let list = countryList;
    // Pick a random country from the list of countries
    const randomCountry1 = list[Math.floor(Math.random() * list.length)];
    // Get place information and images for a random country
    findPlace(randomCountry1, photoEl1);
}

window.onload = function() {
    var destinationBtn = document.getElementById('destinationBtn');
    var destinationContent = document.getElementById('destinationContent');
    var closeBtn = document.getElementById('closeBtn');
    var overlay = document.getElementById('overlay');
    
    destinationBtn.addEventListener('click', function () {
        destinationContent.classList.remove('hidden');
        overlay.classList.remove('hidden');
    });
    
    closeBtn.addEventListener('click', function () {
        destinationContent.classList.add('hidden');
        overlay.classList.add('hidden');
    });
}
