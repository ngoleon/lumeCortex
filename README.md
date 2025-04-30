# 🧠 LumeCortex – Local AI Chat UI

**LumeCortex** is a modular Electron-based desktop app that lets you interact with local LLMs like `mistral-7b-instruct` via Ollama or vLLM. It features a clean chat UI, selectable personas, and real-time token logprob visualizations using Chart.js.

---

## 🚀 Features

- 🧩 **Modular architecture**: UI components and logic split into manageable files
- 🧠 **Local LLM API**: Uses Ollama-compatible `/v1/completions` endpoint
- 📊 **Token visualizer**: Click on any token to see the model's top predictions and probabilities
- 👤 **Persona support**: Swap system prompts and names for different AI personalities
- ⚡ **No streaming required**: Uses sync completions with `logprobs` enabled

---

## 📁 Folder Structure

```
renderer/
├── events/               # Event bindings (send, click, enter key)
│   └── EventHandlers.js
├── state/                # Global chat state (prompt, history, persona)
│   └── ChatState.js
├── ui/                   # UI logic (chat rendering, chart, persona dropdown)
│   ├── ChatUI.js
│   ├── TokenChart.js
│   └── PersonaSelector.js
├── index.html            # Main UI HTML
├── index.css             # Styling
└── renderer.js           # Bootstrapping logic
```

---

## 🛠️ Requirements

- [Node.js](https://nodejs.org/)
- [Electron](https://www.electronjs.org/)
- [Mistral](MISTRAL.md)

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/ngoleon/lumecortex.git
cd lumecortex

# Install dependencies
npm install
```

---

## ▶️ Running

```bash
npm start
```

Make sure your LLM API ([Mistral](MISTRAL.md)) is running locally:

```bash
./run-mistral-server.sh
```

---

## ⚙️ Environment Setup

Create a `.env` file if needed (optional for future config):

```env
MODEL=mistral-7b-instruct-v0.2
ENDPOINT=http://localhost:8000/v1/completions
```

---

## 📈 Logprob Visualization

- Tokens are rendered individually.
- Click on any token to see its top predicted alternatives.
- Uses Chart.js bar chart.

---

## 📚 Tech Stack

- Electron
- JavaScript (ES6 modules)
- Chart.js
- Local LLM via Ollama or vLLM
- HTML / CSS

---

## 💡 Future Ideas

- Streaming completions
- Editable persona manager
- Markdown rendering
- Export chat history

---

## 🧑‍💻 Author

Built by **Leon Ngo** for learning, experimentation, and understanding how LLMs generate text.
