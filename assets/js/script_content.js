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

/* function getResult(){   

  $(".five-day").empty();
  $(".city").empty()

 inputCity = document.getElementById("myInput").value;   
  var countryCode='US';    
  var cityCode=inputCity;       
  
  var geoLon;   
  var geoLat;
      
  var cityName =$("<h>")    
  cityName.addClass("h3")  
  var temp = $("<div>")    
  var wind = $("<div>")    
  var humidity = $("<div>")   
  var uvIndex = $("<div>")  
  var icon =$("<img>")
  icon.addClass("icon");    
  var dateTime = $("<div>")

  $(".city").addClass("list-group")
  $(".city").append(cityName)    
  $(".city").append(dateTime)    
  $(".city").append(icon)    
  $(".city").append(temp)    
  $(".city").append(wind)    
  $(".city").append(humidity)    
  $(".city").append(uvIndex)
  
  
  var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityCode + "," + countryCode + "&limit=5&appid=7d1b285353ccacd5326159e04cfab063"
      
  //We then pass the requestUrl variable as an argument to the fetch() method, like in the following code:    
    fetch(geoUrl)
  
      //Convert the response into JSON. Lastly, we return the JSON-formatted response, as follows:
      .then(function (response) {
        return response.json();
      })
  
      .then(function (data) {
        geoLon = data[0].lon;
        geoLat = data[0].lat;
  
        //use geoLat and geoLon to fetch the current weather
        var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + geoLat + "&lon="+ geoLon + "&exclude=minutely,hourly,alerts&units=imperial&appid=7d1b285353ccacd5326159e04cfab063";
          
        fetch(weatherUrl)

        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // console.log(data)
          
          weatherIcon= data.current.weather[0].icon;
          imgSrc = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
          icon.attr('src',imgSrc)
      
          cityName.text(cityCode);
          //translate utc to date
          var date = new Date(data.current.dt * 1000);
          dateTime.text("("+ (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + ")");

          temp.text("Temperature: "+ data.current.temp + " F");
          humidity.text("Humidity: " + data.current.humidity + " %");
          wind.text("Wind Speed: " + data.current.wind_speed + " MPH");

          // WHEN I view the UV index
          // THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe    
          var uvi =$("<div>")
          uvIndex.text("UV Index: ");
          uvi.text(data.current.uvi)
          uvIndex.append(uvi)
          uvIndex.addClass("d-flex") */