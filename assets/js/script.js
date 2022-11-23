var apiKey = '46074b9ef56b76a7cf48ee21aaf3a35b'
var limit = 5

var searchBtn = document.querySelector('.search-btn')
var cardWrapperEl = document.querySelector('.card-wrapper')
var cityEl = document.querySelector('.city')
var stateVar

// function to fetch the lon and lat coordinates
function fetchCityData(event) {
	event.preventDefault()
	var inputEl = document.querySelector('.search-input')
	var inputValue = inputEl.value
	var geoCodingURL = `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=${limit}&units=imperial&appid=${apiKey}`
	fetch(geoCodingURL)
		.then((res) => {
			return res.json()
		})
		.then((data) => {
			// console.log(data[0])
			stateVar = data[0].state
			return fetchWeatherData(data[0])
		})
		.catch((err) => {
			console.log(err)
		})
	inputEl.value = ''
}

// function to fetch the city's weather data based on coordinate parameters
function fetchWeatherData(coordinates) {
	var { lat } = coordinates
	var { lon } = coordinates
	var baseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat.toFixed(
		2
	)}&lon=${lon.toFixed(2)}&appid=${apiKey}`
	fetch(baseURL)
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
	for (var i = 0; i < weatherData.list.length; i += 8) {
		// create elements
		var cardArticleEl = document.createElement('article')
		var cardh3El = document.createElement('h3')
		var iconEl = document.createElement('img')
		var tempEl = document.createElement('p')
		var windEl = document.createElement('p')
		var humidityEl = document.createElement('p')

		// set attributes
		cardArticleEl.setAttribute('class', 'singleWeatherCard')
		cardh3El.setAttribute('class', 'card-date')
		iconEl.setAttribute('class', 'icon')
		iconEl.setAttribute('src', './assets/images/cloudy-icon.png')
		tempEl.setAttribute('class', 'temperature')
		windEl.setAttribute('class', 'wind')
		humidityEl.setAttribute('class', 'humidity')

		// set inner HTML
		cardh3El.textContent = weatherData.list[i]['dt_txt'].substring(0, 10)
		tempEl.textContent = 'Temp: ' + weatherData.list[i].main.temp

		// append children to parent el
		cardArticleEl.appendChild(cardh3El)
		cardArticleEl.appendChild(tempEl)
		cardArticleEl.appendChild(iconEl)
		cardWrapperEl.appendChild(cardArticleEl)
	}
}

// function to save past searched cities to localStorage
function saveSearch(city) {
	return localStorage.setItem(cityName, city)
}

// search city button event handler
searchBtn.addEventListener('click', fetchCityData)
