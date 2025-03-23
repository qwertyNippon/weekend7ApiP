const  cloudsImage = './static/img/clouds.png';
const  clearImage = './static/img/clear.png';
const  rainImage = './static/img/rain.png';
const  drizzleImage = './static/img/drizzle.png';
const  mistImage = './static/img/mist.png';
const  snowImage = './static/img/snow.png';


const apiKey = '8af4e71eae5d6475836fe6ff020f68a8';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const searchB = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const CardContainer = document.querySelector('[data-cards-container]');
// const CardTemplate = document.querySelector("[data-card-template]")
// const CardContainer = document.querySelector('[data-cards-container]');
const searchInput = document.querySelector("[data-search]")



const findMyCity = () => {
    const status = document.querySelector('.status');
    const cityEntry = document.getElementById('cityEntry');
    
    // testing chat code below
    const CardTemplate = document.getElementById('[data-card-template]');
    const CardContainer = document.getElementById('[data-cards-container]');
    // const test code end
    // let cities = [];

    let city = {};

    const success = (position) => {
        console.log(position)
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`

        fetch(geoApiUrl)
            .then(res => res.json())
            .then(data => {
                city = data.city
                cityEntry.value = city;
                checkWeather(city)

            })
            
        }
        
        const error = () => {
            wrong = 'Not able to retrieve your location';
        }
        
        // console.log(city)
        // success()
        navigator.geolocation.getCurrentPosition(success,error)

        let cities = [];

        searchInput.addEventListener("input", event => {
            console.log('listener');
            const value = event.target.value.toLowerCase();
    
            cities.forEach(city => {
                const isVisible = city.city.toLowerCase().includes(value);
                city.element.classList.toggle("hide", !isVisible)
            });
        });
    
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=$%7Blatitude%7D&longitude=$%7Blongitude%7D&localityLanguage=en`)
        .then(res => res.json())
        .then(data => {
            const citiesData = Object.values(data);
            // const outPut = object.values(data);
            cities = citiesData.map(city => {
                const card = CardTemplate.content.cloneNode(true).querySelector('.city-card');
                const cityElement = card.querySelector('[data-body]');
                cityElement.textContent = city.city;
                CardContainer.append(card);
    
                return { city : city.city, element: card}
            });
        });
}


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

    if(data.weather[0].main === 'Clouds'){
        weatherIcon.src = cloudsImage;
    }
    else if(data.weather[0].main === 'Clear'){
        clearImage;

    }
    
    else if(data.weather[0].main === 'Rain'){
        weatherIcon.src = rainImage;

    }
    
    else if(data.weather[0].main === 'Drizzle'){
        weatherIcon.src = drizzleImage;

    }
    else if(data.weather[0].main === 'Mist'){
        weatherIcon.src = mistImage;

    }
    else if(data.weather[0].main === 'Snow'){
        weatherIcon.src = snowImage;

    }

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
    }
}

let input = document.querySelector('input');
    input.addEventListener('keyup', (event) => {
        // textCity()
        console.log('textC 2')
        // ****************
        // searchInput.addEventListener("input", event => {
        // const value = event.target.value.toLowerCase()
        // cities.forEach(city => {
        //   const isVisible =
        //   cityLst.textContent.toLowerCase().includes(value)
        //   city.element.classList.toggle("hide", !isVisible)
        // })
        // })
        // *****************
        if (event.key === 'Enter' || event.key === 'NumpadEnter') {
            checkWeather(searchB.value);
        }
    console.log('hello')
    });

searchBtn.addEventListener('click', ()=> {
    checkWeather(searchB.value);
});

window.onload = function() {
    findMyCity()
    // checkWeather(city)
};

