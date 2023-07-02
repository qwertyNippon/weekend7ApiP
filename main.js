const apiKey = '8af4e71eae5d6475836fe6ff020f68a8';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const searchB = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');


async function checkWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    // const response = await fetch(apiUrl + city +`&appid=${apiKey}`);


    if (response.status == 404){
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    }else{
    
    let data = await response.json();

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';

        if(data.weather[0].main == 'Clouds'){
            weatherIcon.src = '/static/img/clouds.png';
        }
        else if(data.weather[0].main == 'Clear'){
            weatherIcon.src = '/static/img/clear.png';

        }
        
        else if(data.weather[0].main == 'Rain'){
            weatherIcon.src = '/static/img/rain.png';

        }
        
        else if(data.weather[0].main == 'Drizzle'){
            weatherIcon.src = '/static/img/drizzle.png';

        }
        else if(data.weather[0].main == 'Mist'){
            weatherIcon.src = '/static/img/mist.png';

        }

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
    }
}

let input = document.querySelector('input');
    input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter' || event.key === 'NumpadEnter') {
            checkWeather(searchB.value);
        }
    console.log('hello')
    });

searchBtn.addEventListener('click', ()=> {
    checkWeather(searchB.value);
});
