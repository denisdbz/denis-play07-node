#!/bin/bash

echo "[*] Iniciando testes reais com WebDriverIO..."

# Checa se o Node.js está disponível
if ! command -v node &> /dev/null; then
  echo "[X] Node.js não encontrado."
  exit 1
fi

# Instala dependências (caso a imagem precise)
echo "[*] Instalando dependências Node.js..."
npm install

if [ $? -ne 0 ]; then
  echo "[X] Falha ao instalar dependências com npm."
  exit 1
fi

# Executa os testes com WebDriverIO
echo "[*] Executando testes com WebDriverIO..."
npx wdio run wdio.conf.js

if [ $? -eq 0 ]; then
  echo "[✓] Teste finalizado com sucesso."
else
  echo "[X] Erro ao executar o teste com WebDriverIO."
fi
