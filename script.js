const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const weatherCurr = document.getElementById('details');
const timezone = document.getElementById('time-zone');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


//Array of days
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//Array of months
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//API key
const API_KEY = 'af47796a60152587afcffc79fd270f8d';

//API Url
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';

//Search input
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');

//Weather icon variable
const weatherIcon = document.getElementById('icon');

//Call function every one second
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const TwelveHourFormat = hour >= 13 ? hour % 12 : hour;
    const minutes = time.getMinutes().toString().padStart(2, '0'); // Add padding to minutes
    const ampm = hour >= 12 ? 'PM' : 'AM';

    timeElement.innerHTML = TwelveHourFormat + ':' + minutes + ' ' + `<span id="am-pm">${ampm}</span>`;

    dateElement.innerHTML = days[day] + ', ' + months[month] + ' ' + date;
}, 1000);





async function getWeatherData(city) {

    const response = await fetch(API_URL + city + `&appid=${API_KEY}`);
    const data = await response.json();

    console.log(data);

    //Select all elements and update the data
    document.querySelector(".time-zone").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".time-zone").innerHTML = data.name;
    document.querySelector(".Humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".pressure").innerHTML = data.main.pressure + " Pa";
    document.querySelector(".sunrise").innerHTML = formatTime(data.sys.sunrise);
    document.querySelector(".sunset").innerHTML = formatTime(data.sys.sunset);

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
    else if(data.weather[0].main == "]Mist"){
        weatherIcon.src = "images/mist.png";
    }
    else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "images/snow.png";
    }

}
// Add event listener to the button
searchBtn.addEventListener("click", () => {
    getWeatherData(searchInput.value); 
});

//Formatting the time for sunset and sunrise
function formatTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    const formattedHours = (hours % 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

    

   /* navigator.geolocation.getCurrentPosition((success) => {

        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            }) 
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }, (error) => {
        console.error('Error getting geolocation:', error);
    });*/

