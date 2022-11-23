var apiKey = '46074b9ef56b76a7cf48ee21aaf3a35b'
var limit = 5

var searchBtn = document.querySelector('.search-btn')
var cardWrapperEl = document.querySelector('.card-wrapper')
var cityEl = document.querySelector('.city')
var stateVar

// function to fetch the lon and lat coordinates
async function fetchCityData(event) {
	event.preventDefault()
	var inputEl = document.querySelector('.search-input')
	var inputValue = inputEl.value
	var geoCodingURL = `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=${limit}&appid=${apiKey}`
	await fetch(geoCodingURL)
		.then((res) => {
			return res.json()
		})
		.then((data) => {
			console.log(data[0])
			stateVar = data[0].state
			return fetchWeatherData(data[0])
		})
		.catch((err) => {
			console.log(err)
		})
	inputEl.value = ''
}

// function to fetch the city's weather data based on coordinate parameters
async function fetchWeatherData(coordinates) {
	var { lat } = coordinates
	var { lon } = coordinates
	var baseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat.toFixed(
		2
	)}&lon=${lon.toFixed(2)}&appid=${apiKey}`
	await fetch(baseURL)
		.then((res) => {
			return res.json()
		})
		.then((weatherData) => {
			console.log(weatherData)
			return populateCards(weatherData)
		})
}

function populateCards(weatherData) {
	// create weather cards and populate them with class attributes
	// for loop for each of the five days of the forecast
	cityEl.innerHTML = `${weatherData.city.name}, ${stateVar}`
	for (var i = 0; i < 5; i++) {
		var cardArticleEl = document.createElement('article')
		var cardh3El = document.createElement('h3')
		cardArticleEl.setAttribute('class', 'singleWeatherCard')
		cardh3El.setAttribute('class', 'card-date')
		var iconEl = document.createElement('img')
		iconEl.setAttribute('class', 'icon')
		var tempEl = document.createElement('p')
		tempEl.setAttribute('class', 'temperature')
		var windEl = document.createElement('p')
		windEl.setAttribute('class', 'wind')
		var humidityEl = document.createElement('p')
		humidityEl.setAttribute('class', 'humidity')
	}
}

// function to save past searched cities to localStorage
function saveSearch(city) {
	return localStorage.setItem(cityName, city)
}

// search city button event handler
searchBtn.addEventListener('click', fetchCityData)
