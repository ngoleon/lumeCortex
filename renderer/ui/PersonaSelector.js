// renderer/ui/PersonaSelector.js
import { ChatState } from '../state/ChatState.js';
import { appendMessage } from './ChatUI.js';

export function setupPersonas() {
  const personaSelect = document.getElementById('persona');
  const personas = window.lumeAPI.loadPersonas();
  personas.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.prompt;
    opt.textContent = p.name;
    personaSelect.appendChild(opt);
  });
}

export function handlePersonaChange() {
  const personaSelect = document.getElementById('persona');
  ChatState.currentPrompt = personaSelect.value;
  ChatState.currentPersonaName = personaSelect.selectedOptions[0].text;
  document.getElementById('chat').innerHTML = '';
  ChatState.chatHistory = [];
  appendMessage('ai', `Hi! I'm ${ChatState.currentPersonaName}. Let's chat!`);
}
