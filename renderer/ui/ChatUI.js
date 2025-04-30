// renderer/ui/ChatUI.js
import { ChatState } from '../state/ChatState.js';

export function appendMessage(sender, text, logprobs = null) {
  const chatDiv = document.getElementById('chat');
  const msg = document.createElement('div');
  msg.className = sender;

  if (sender === 'ai' && logprobs?.content && Array.isArray(logprobs.content)) {
    msg.innerHTML = '';

    const prefix = document.createElement('span');
    prefix.textContent = `${ChatState.currentPersonaName}: `;
    msg.appendChild(prefix);

    logprobs.content.forEach(log => {
      const token = log.token;
      const span = document.createElement('span');
      span.className = 'token-word';

      const cleanToken = token.replace(/^▁/, '');
      span.textContent = (token.startsWith('▁') ? ' ' : '') + cleanToken;

      span.dataset.logprobs = JSON.stringify(log.top_logprobs);
      msg.appendChild(span);
    });
  } else {
    const prefix = sender === 'user' ? 'You' : ChatState.currentPersonaName;
    msg.textContent = `${prefix}: ${text}`;
  }

  chatDiv.appendChild(msg);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}
