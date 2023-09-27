const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetalles = document.querySelector('.weather-detalles');
const error404 = document.querySelector('.not-found');



search.addEventListener('click',()=>{
    const APIKey ='9facf5d2ac04d14454fb3f1489bc16ea'
    const ciudad = document.querySelector('.search-box input').value;
    console.log(ciudad)

    if(ciudad === '')return;
    
    fetch(`api.openweathermap.org/data/2.5/forecast/daily?q=${ciudad}&cnt=1&appid=${APIKey}`).then(response => response.json()).then(json =>{
        if(json.cod === '404'){
            container.computedStyleMap.heigth ='400px';
            weatherBox.computedStyleMap.display='none';
            weatherDetalles.style.display='none';
            error404.style.display='block';
            error404.classList.add('fadeIn');
            return;
        }
        error404.style.display='none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperatura');
        const descripcion = document.querySelector('.weather-box .descripcion');
        const humedad = document.querySelector('.weather-detalles .humedad span')
        const viento = document.querySelector('.weather-detalles .viento span')

        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'img/clear.png';
                break;

            case 'Rain':
                image.src = 'img/rain.png';
                break;

            case 'Snow':
                image.src = 'img/snow.png';
                break;

            case 'Clouds':
                image.src = 'img/cloud.png';
                break;

            case 'Haze':
                image.src = 'img/haze.png';
                break;
            
            default:
                image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        descripcion.innerHTML = `${json.weather[0].description}`;
        humedad.innerHTML = `${json.main.humidity}%`
        viento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetalles.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetalles.classList.add('fadeIn');
        container.style.heigth = '590px';


    })
})

