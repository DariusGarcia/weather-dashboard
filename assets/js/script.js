var apiKey = '46074b9ef56b76a7cf48ee21aaf3a35b'
var baseURL = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
var limit = 5
var geoCodingURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`

var coordinates = {
	lat: '',
	lon: '',
}

var searchBtn = document.querySelector('.search-btn')
var inputEl = document.querySelector('.search-input')
