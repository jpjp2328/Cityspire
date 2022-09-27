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
      // Make sure a valid response was received
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Use first id of the place
        getPlaceInfo(results[0].place_id, photoEl)
      }
    }
    // Call Google API to find place id
    placesService.findPlaceFromQuery(request, callback);
  }