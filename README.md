# Cityspire-project

An colaborative effort to make travel inspiration webpage that has different cities and would display relevant information/pictures of the selected location.

## Collaborators
- Jeffrey (github.com/jpjp2328)
- Laura (github.com/505laura)
- AND.evv (github.com/andrew60199)

## Inspiration
Coming out of the global Covid-19 pandemic, many people across the globe would had experienced some sort of lockdown. Slowly restrictions are being removed around the world and traveling would become as popular as ever. With this in mind our team wanted to create an application that utilizes different features working together, to give the user an effortless way to get many different information about the city of their choice.

## Purpose (idea/features)
- The ability to search and review places/cities you know and be presented with new and exciting possible destinations 
- Inspire and inform users of unique destinations that they may not know through dynamic ever-changing homepage images
- Giving detail of selected destinations with rotating images/map/info of the city/weather conditions as well as if there is any events close by.

## Process/Technology
- Wireframing (Figma)
- Js Library (jQuery)
- Css Framework (Tailwind css)
- Project management (Kanban board)
- Server APIs used (Wikipiedia, google maps, google places, openweathermap, google geolocation, Ticketmaster)

## Features
### Home Page
This page would be the main page of our application with recommendations and suggestions of destinations

- Each time Home Page loads, random cities with images would be displayed to inform users of unique cities they may be unaware/didn't think of.
- Random cities displayed would be interactive and when clicked, it would redirect to the relevant content page
- When the user uses the search bar, there would be a autofill drop bar with names of different destinations
- When the user searches for a destination, they would be redirected to our content page with relevant information of selected city 
- "Destinations" button would display a list of recommended cities to visit which are all interactive and would redirect you to the relevant content page

### Content Page
This page would include all the relevant information of the selected city including:

- A paragraph of information of the selected city with a Read More Button that redirects the user to the wikipedia page of the city if they wanted to learn more.
- Information about the current weather of the selected city with a weather icon along with relevant weather information such as Temp, Wind speed, Humidity and UV Index
- An image carousel with rotating images of the selected city so user is able to have view the city from different perspectives
- An interactive google map showing the selected city so users can see what is around the city, including any attractions and entertainment nearby. (Street View is also available for users to have a good idea around the area)
-  An calendar event widget powered by ticketmaster that would display events that are in the selected city. The calender allows planning trips to be easier allowing you to search for events during the time you'll be in the city.
- A Search History, utilising localstorage to show cities the user have previously searched for, incase you would want to revisit the page. (Inlcude a clear history button as well)

## Directions for future development
- Expand upon the filtering and narrowing down destinations
- Current news of selected city
- Making the site more relevant in today’s society by adding Covid-19 travel information/restrictions/rules in selected city using another API
- Reviews
- Progress into a travel planning site with functions such as itineraries
- Booking and browsing (hotels/restaurants/flights)
- Balance between random and recommended results
- Known Bugs
  - Weather API defaults to US cities when they share name
  - Same as Ticketmaster as linked to weather API
  - Wikipedia articles don't load if city is two words or more and not capitalized

## Final Product

![](assets/images/Cityspire.gif)

Github deployment - http://jpjp2328.github.io/Cityspire
