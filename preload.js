const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

// Backend API
contextBridge.exposeInMainWorld('lumeAPI', {
  loadPersonas: () => {
    const dir = path.join(__dirname, 'personas');
    const files = fs.readdirSync(dir);
    return files.map((file) => {
      const full = path.join(dir, file);
      const data = fs.readFileSync(full, 'utf-8');
      const json = JSON.parse(data);
      return { name: json.name, prompt: json.prompt };
    });
  },

  sendMessage: async (personaName, systemPrompt, userMessage) => {
    return await ipcRenderer.invoke('ask-gpt', personaName, systemPrompt, userMessage);
  }
});

  