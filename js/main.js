let cityInput = document.getElementById('city_input'),
searchBtn = document.getElementById('searchBtn'),
api_key = '505efd65257b3b08cad0d3f15397b369';
currentWeatherCard = document.querySelectorAll('.weather-left.card')[0];

function getWeatherDetails(name, lat, lon, country, state){
    let FORECAST_API_URL = 'api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt={cnt}&appid=${api_key}';
    let WEATHER_API_URL = 'api.openweathermap.org/data/2.5/weather/daily?lat=${lat}&lon=${lon}&cnt={cnt}&appid=${api_key}';
    days =[
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
    ];

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
      let date = new Date();
    }).catch(() => {
        alert('Failed to fetch current weather');
    });

}

function getCityCoordinates(){
    let cityName = cityInput.ariaValueMax.trim();
    cityInput.value = '';
    if(!cityName) return;
    let GEOCODING_API_URL = 'http://api.openweathermap.org/geo/1.0/direct?q=${cityName},{state code},{country code}&limit={limit}&appid=${api_key}';
fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
    let {name, lat, lon, country, state} = data[0];
    getWeatherDetails(name, lat, lon, country, state);
}).catch(() => {
    alert('Failed to fetch coordinates of ${cityName}');
});
}

searchBtn.addEventListener('click', getCityCoordinates);