# WDI Project 2: Travel app 

## User Stories
* User will land on a landing page that asks him for a user login/password or allows him to sign up
* User will then be redirected into the main page where he will see a big map and a navigation bar with multiple options:
	*	a link to a list of every country with information about the country
	* a link to the trips he/she has made
	* a link to a list of places he/she wants to visit
	* a link to go back to main page, and one to logout
	*	Both databases will be joined by the city in common 
*	The user should be able to add a new item to each list, entering a description and date visited
*	When clicking on each item list he/she should be directed to a show page where they will be able to update a particular item on the list or delete it
	*Likewise for the “Places I want to visit” 
*	The map on the main page should mark the places visited by the user 


## Technologies used
### Database
* Countries:
	* Data table contains a list of every country in the world and some information about each country 
* Trips:
	* Contains a list of the trips the user has made and a small description and is related to the countries' table
* Wants:
	* Contains a list of the places the user wants to visit

### Express, PG-Promise, Mustache-Express
### RESTful routes: GET, POST, PUT, and DELETE
* My application allows the user to interact with the database by adding, deleting, updating and getting the information on the database. They can add a trip, update it and delete it. Users can also add and delete trips from the list of places they want to visit. 
### External APIs
* #### Google Maps Geocoding API 
	* Geocoding is the process of converting addresses (ex. street address or a city) into geographic coordinates (ex. latitude and longitude), which  can be used to place markers on a map. 
	* In my application, the API is used to use a city name and convert it into a marker on a google-based map
* #### Unsplash API
	* API containing the largest collection of high-quality photographs
	* Narrowed the selection of random photos by adding a search term (city and country name) to get random pictures of cities and countries.
* #### Rest Countries API
	* Used this API to get more information about each country and save the data from into my own database
### MVC Architecture
* Software architectural pattern used to implements user interfaces on computers. It divides the application into thre parts that are connected with one another
### NPM Additional Package
* #### Bootstrap
	* Bootstrap is a "sleek, intuitive, and powerful front-end framework for faster and easier web development"
	* Features: 
		* Responsive: Bootstrap's responsive CSS adjusts to phones, tablets, and desktops
		* Easy to position and size images
		* Compatible with all modern browsers


## Closing of Project
### Unsolved problems: 
* Lack delete button on my "Places I want to visit" list because of time constraints
* Some CSS adjustments- buttons for example
* Wanted to add a different colored marker for the places the user wants to visit but has not visited still
* Edit the countries list so users can search through it alphabetically 

### Other 2 APIs I researched: 
* Instagram
* Foursquare