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