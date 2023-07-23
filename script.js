const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const weatherCurr = document.getElementById('details');
const timezone = document.getElementById('time-zone');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

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
}, 1000);
