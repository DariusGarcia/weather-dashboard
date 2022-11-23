var apiKey = '46074b9ef56b76a7cf48ee21aaf3a35b'
var limit = 5

var searchBtn = document.querySelector('.search-btn')

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

			return fetchWeatherData(data[0])
		})
		.catch((err) => {
			console.log(err)
		})
}

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
		.then((data) => {
			console.log(data)
			// return data
		})
}

function saveSearch(city) {
	localStorage.setItem(cityName, city)
}

searchBtn.addEventListener('click', fetchCityData)
