document.addEventListener('DOMContentLoaded', function() {
  const apiKey = '7f6b2b2901ccfdb82bda76d2ef1024c7';
  const searchButton = document.getElementById('search-button');
  const cityInput = document.getElementById('city-input');
  const weatherInfo = document.getElementById('weather-info');
  const weatherTable = document.getElementById('weather-table');

  
  toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
    newestOnTop: true,
    showDuration: 300,
    hideDuration: 1000,
    timeOut: 5000,
    extendedTimeOut: 1000,
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
  };

  const searchWeather = function() {
    const city = cityInput.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const humidity = data.main.humidity;
        const pressure = data.main.pressure;
        const tempMin = data.main.temp_min;
        const tempMax = data.main.temp_max;
        const windSpeed = data.wind.speed;
        const clouds = data.clouds.all;

        const tableRows = `
          <tr>
            <td>Temperature</td>
            <td>${temperature}°C</td>
          </tr>
          <tr>
            <td>Weather</td>
            <td>${weatherDescription}</td>
          </tr>
          <tr>
            <td>Humidity</td>
            <td>${humidity}%</td>
          </tr>
          <tr>
            <td>Pressure</td>
            <td>${pressure} hPa</td>
          </tr>
          <tr>
            <td>Min Temperature</td>
            <td>${tempMin}°C</td>
          </tr>
          <tr>
            <td>Max Temperature</td>
            <td>${tempMax}°C</td>
          </tr>
          <tr>
            <td>Wind Speed</td>
            <td>${windSpeed} m/s</td>
          </tr>
          <tr>
            <td>Clouds</td>
            <td>${clouds}%</td>
          </tr>
        `;

        weatherTable.innerHTML = tableRows;
        weatherTable.style.display = 'table';
        weatherInfo.style.display = 'none';

        const previousImage = document.getElementById('weather-image');
        if (previousImage) {
          previousImage.remove();
        }

        const weatherImage = document.createElement('img');
        weatherImage.id = 'weather-image';
        weatherImage.src = getImageSrc(weatherDescription);
        weatherImage.alt = weatherDescription;
        weatherImage.style.maxWidth = '200px';
        weatherImage.style.marginTop = '50px';

        const weatherContainer = document.querySelector('.weather-container');
        weatherContainer.appendChild(weatherImage);
        toastr.success(`${name} data found successfully`, 'Success');
      })
      .catch(error => {
        console.log('Error:', error);
        weatherTable.style.display = 'none';
        weatherInfo.style.display = 'block';
        weatherInfo.innerHTML = 'Error fetching weather data.';
        toastr.error('Error fetching weather data.', 'Error');
      });
  };

  const getImageSrc = function(weatherDescription) {
    if (weatherDescription.includes('cloud')) {
      return 'cloud.jpeg';
    } else if (weatherDescription.includes('rain')) {
      return 'rain.jpeg';
    } else if (weatherDescription.includes('sun')) {
      return 'light-rain-at-night.jpeg';
    } else {
      return 'sloot.jpeg';
    }
  };
  



  searchButton.addEventListener('click', searchWeather);

  cityInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      searchWeather();
    }
  });
});
