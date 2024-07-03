const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');
require('dotenv').config(); // Ici on charge les variables d'environnement (.env)

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('get-weather', async (event, city) => {
  const apiKey = process.env.API_KEY; // J'utilise la clé API depuis les variables d'environnement
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

  try {
    const response = await axios.get(url);
    event.reply('weather-result', response.data);
  } catch (error) {
    event.reply('weather-result', { error: error.message });
  }
});

