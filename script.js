const apiKey = "getenv("API_KEY");

function displayWeather(data) {
  const result = document.getElementById("weatherResult");

  const { name, sys, main, weather, wind } = data;

  result.innerHTML = `
    <h3>${name}, ${sys.country}</h3>
    <p style="font-size: 30px;">🌡 ${main.temp}°C</p>
    <p>🌥 ${weather[0].description}</p>
    <p>💧 Humidity: ${main.humidity}%</p>
    <p>💨 Wind: ${wind.speed} m/s</p>
  `;
}

async function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod != 200) {
  alert("City not found");
  return;
}
    displayWeather(data);
  } catch (error) {
    alert("Error fetching data");
  }
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
      } catch (error) {
        alert("Error fetching location weather");
      }
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}