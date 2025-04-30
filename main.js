const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

function createWindow() {
  const win = new BrowserWindow({
    width: 650,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  win.loadFile('renderer/index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Handle local model requests
ipcMain.handle('ask-gpt', async (_event, personaName, systemPrompt, userMessage) => {
  try {
    const fullPrompt = `${systemPrompt.trim()}\nUser: ${userMessage}\n${personaName}:`;

    const response = await axios.post('http://localhost:8000/v1/completions', {
      model: 'mistral-7b-instruct-v0.2',
      prompt: fullPrompt,
      max_tokens: 512,
      temperature: 0.7,
      logprobs: 5,
      stream: false
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    // console.log('Full response:', response.data);

    // if (response.data.choices?.[0]?.logprobs) {
    //   console.log('Logprobs found:', response.data.choices[0].logprobs);
    // } else {
    //   console.log('No logprobs found in the response');
    // }

    return response.data;

  } catch (err) {
    console.error('Error talking to vLLM:', err.message);
    return { error: 'vLLM server not reachable.' };
  }
});
