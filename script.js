const apiKey = "c9b049688fcbf385f329a6cc96566eb7";

function displayWeather(data) {
  const result = document.getElementById("weatherResult");

  result.innerHTML = `
    <h3>${data.name}, ${data.sys.country}</h3>
    <p>🌡 Temperature: ${data.main.temp}°C</p>
    <p>🌥 Condition: ${data.weather[0].description}</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
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