const apiKey = '8af4e71eae5d6475836fe6ff020f68a8';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const searchB = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const CardContainer = document.querySelector('[data-cards-container]');

const findMyCity = () => {
    const status = document.querySelector('.status');
    const cityEntry = document.getElementById('cityEntry');

    let cities = [] 

    fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=$%7Blatitude%7D&longitude=$%7Blongitude%7D&localityLanguage=en')
    .then(res => res.json())
    .then(data => {
        cities = data.map(city => {
            const card = userTemplate.content.cloneNode(true).children[0]
            const cityLst = card.querySelector('[data-body]')
            cityLst.textContent = city.city
            CardContainer.append(card)
            return { city : cityLst.textContent}
        })
    })

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
}



// *****************************
const textCity  = () => {
    searchInput.addEventListener("input", event => {
        const value = event.target.value.toLowerCase()
        cities.forEach(city => {
          const isVisible =
          cityLst.textContent.toLowerCase().includes(value)
          city.element.classList.toggle("hide", !isVisible)
        })
        })

    fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=$%7Blatitude%7D&longitude=$%7Blongitude%7D&localityLanguage=en')
    .then(res => res.json())
    .then(data => {
        cities = data.map(city => {
            const card = userTemplate.content.cloneNode(true).children[0]
            const cityLst = card.querySelector('[data-body]')
            cityLst.textContent = city.city
            CardContainer.append(card)
            return { city : cityLst.textContent}
        })
    })
}
// *****************************

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
            weatherIcon.src = 'https://i.imgur.com/I3KClPQ.png';
        }
        else if(data.weather[0].main == 'Clear'){
            weatherIcon.src = 'https://i.imgur.com/wwF4Myd.png';

        }
        
        else if(data.weather[0].main == 'Rain'){
            weatherIcon.src = 'https://i.imgur.com/M6IXiy6.png';

        }
        
        else if(data.weather[0].main == 'Drizzle'){
            weatherIcon.src = 'https://i.imgur.com/UwM04RA.png';

        }
        else if(data.weather[0].main == 'Mist'){
            weatherIcon.src = 'https://i.imgur.com/3T4JALh.png';

        }
        else if(data.weather[0].main == 'Snow'){
            wImg.src = 'https://i.imgur.com/VKAVCa9.png';

        }

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
    }
}

let input = document.querySelector('input');
    input.addEventListener('keyup', (event) => {
        textCity()
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

