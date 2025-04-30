# Mistral 7B Setup on WSL 2 with GPU Acceleration

This README provides step-by-step instructions for setting up **Mistral 7B** on **WSL 2** using **Ubuntu**, with **GPU acceleration** enabled. It includes setting up the necessary dependencies, compiling the **llama.cpp** repository, and running the Mistral 7B model.

---

## Prerequisites

### 1. **Install WSL 2**

Ensure you are using **WSL 2** with Ubuntu. If you haven't set up WSL 2 yet, follow these steps:

1. **Enable WSL and Virtual Machine Platform**:

   - Open PowerShell as Administrator and run:
     ```powershell
     dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
     dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
     ```

2. **Install Ubuntu from the Microsoft Store** (or your preferred distro).

3. **Set WSL 2 as the default version**:
   ```powershell
   wsl --set-default-version 2
   wsl --list --verbose
   ```

### 2. **Install Ubuntu on WSL 2**

Once WSL 2 is enabled, install Ubuntu from the Microsoft Store.

### 3. **Install Required Dependencies**

Update your package lists and install the required tools inside your WSL Ubuntu terminal:

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y nvidia-cuda-toolkit cmake libcurl4-openssl-dev
```

> Tip: Check GPU availability with:
> `nvidia-smi`

### 4. **Clone and Build llama.cpp with CUDA Support**

```bash
cd ~
git clone https://github.com/ggerganov/llama.cpp.git
cd llama.cpp
mkdir -p build
cd build
cmake -DGGML_CUDA=on ..
cmake --build . --config Release
```

### 5. **Clone and Build llama.cpp with CUDA Support**

```bash
mkdir -p ~/models/mistral
cd ~/models/mistral
wget https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF/resolve/main/mistral-7b-instruct-v0.2.Q4_K_M.gguf
```

### 6. **Clone and Build llama.cpp with CUDA Support**

Create the script file:

```bash
nano ~/run-mistral-server.sh
```

Paste the following inside:

```bash
#!/bin/bash

MODEL_PATH=~/models/mistral/mistral-7b-instruct-v0.2.Q4_K_M.gguf
SERVER_PATH=~/llama.cpp/build/bin/llama-server
PORT=8000
CTX_SIZE=4096
GPU_LAYERS=35

echo "Starting Mistral 7B server on port $PORT..."
$SERVER_PATH -m $MODEL_PATH --port $PORT --ctx-size $CTX_SIZE --n-gpu-layers $GPU_LAYERS
echo "Server running at http://localhost:$PORT"
```

Then make it executable:

```bash
chmod +x ~/run-mistral-server.sh`
```

### 7. **Start the Server**

Run:

```bash
./run-mistral-server.sh
```

You should see server logs and CUDA initialization confirming GPU usage.

### 8. **Test the API**

```bash
curl -X POST http://localhost:8000/v1/completions \
-H "Content-Type: application/json" \
-d '{
  "model": "mistral-7b-instruct-v0.2",
  "prompt": "Hello, how are you?",
  "max_tokens": 50
}'

```
