// renderer/events/EventHandlers.js
import { ChatState } from '../state/ChatState.js';
import { appendMessage } from '../ui/ChatUI.js';

export function setupEventHandlers(renderTokenChart) {
  const chatDiv = document.getElementById('chat');
  const sendBtn = document.getElementById('send');
  const userInput = document.getElementById('userInput');

  chatDiv.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('token-word')) {
      const logprobs = JSON.parse(target.dataset.logprobs);
      renderTokenChart(logprobs);
    }
  });

  sendBtn.addEventListener('click', () => sendMessage(userInput));
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage(userInput);
  });
}

export async function sendMessage(userInput) {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage('user', text);
  ChatState.chatHistory.push({ role: 'user', content: text });
  userInput.value = '';

  const response = await window.lumeAPI.sendMessage(
    ChatState.currentPersonaName,
    ChatState.currentPrompt,
    text
  );

  const choice = response.choices?.[0] ?? {};
  const replyText = choice.text ?? 'Error: No text';
  const logprobs = choice.logprobs ?? null;

  ChatState.chatHistory.push({ role: 'ai', content: replyText, logprobs });
  appendMessage('ai', replyText, logprobs);
}
