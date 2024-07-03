document.getElementById('city-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const city = document.getElementById('city').value;
    window.api.send('get-weather', city);
  });
  
  window.api.receive('weather-result', (data) => {
    const weatherResultDiv = document.getElementById('weather-result');
    if (data.error) {
      weatherResultDiv.textContent = `Erreur: ${data.error}`;
    } else {
      weatherResultDiv.innerHTML = `
        <h2>Météo pour ${data.name}</h2>
        <p>Température: ${data.main.temp}°C</p>
        <p>Humidité: ${data.main.humidity}%</p>
        <p>Vitesse du vent: ${data.wind.speed} m/s</p>
        <p>Description: ${data.weather[0].description}</p>
      `;
    }
  });
  
