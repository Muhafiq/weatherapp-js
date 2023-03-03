const APIKey = '5e95205055b131595dca938be4a9e1e7';

const searchButton = document.querySelector('.search');
searchButton.addEventListener('click', async function() {
    try {
        let city = document.querySelector('.input-location').value;
        if(city === '') {
            return;
        }
        const data = await getDataWeather(city);
        showDataWeather(data);
    } catch(error) {
        const errorUI = showErrorPage(error);
        document.querySelector('.weather-page').innerHTML = errorUI;
    }
    
});

function getDataWeather(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            if(data.cod !== 200) {
                throw new Error(data.message);
            }
            return data;
        });
}

function showDataWeather(data) {
    const contentContainer = document.querySelector('.content');
    const weatherContainer = document.querySelector('.weather-page');
    contentContainer.classList.add('active-content');
    weatherContainer.innerHTML = showWeatherPage(data);
}

function showWeatherPage(data) {
    let image = '';

    switch(data.weather[0].main) {
        case 'Clear':
            image = './img/clear.png';
            break;
        case 'Clouds': 
            image = './img/cloud.png';
            break;
        case 'Rain':
            image = './img/rain.png';
            break;
        case 'Snow':
            image = './img/snow.png';
            break;
        case 'Haze':
            image = './img/haze.png';
            break;
        default:
            image = './img/404.png';
    }

    return `<h3>${data.name}(${data.sys.country})</h3>
            <img class="weather-image" src="${image}">
            <h4 class="temp">${Math.floor(data.main.temp - 273.15)}°C</h4>
            <h4 class="desc">${data.weather[0].description}</h4>
            <div class="span">
                <span>Wind Speed<br><strong>${data.wind.speed}m/s</strong></span>
                <span>Humidity<br><strong>${data.main.humidity}</strong></span>
            </div>`
}

function showErrorPage(error) {
    return `<img class="weather-image error-image" src="./img/404.png">
            <h4 class="desc">${error}</h4>`;
}