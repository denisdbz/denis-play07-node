#!/bin/bash

echo "[*] Iniciando testes reais com WebDriverIO..."
sleep 1

if [ ! -d "node_modules" ]; then
  echo "[*] Instalando dependências Node.js..."
  npm install
fi

npx wdio run wdio.conf.js

if [[ $? -eq 0 ]]; then
  echo "[✓] Teste automatizado concluído com sucesso."
else
  echo "[X] Erro ao executar o teste."
fi
