const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Servidor Play 07 — WebDriverIO está no ar!');
});

app.get('/executar', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  res.write(`data: [*] Iniciando testes reais com WebDriverIO...\n\n`);

  const scriptPath = path.join(__dirname, 'run.sh');
  const processo = exec(`bash ${scriptPath}`);

  processo.stdout.on('data', data => {
    const linhas = data.toString().split('\n').filter(Boolean);
    linhas.forEach(linha => res.write(`data: ${linha}\n\n`));
  });

  processo.stderr.on('data', data => {
    const linhas = data.toString().split('\n').filter(Boolean);
    linhas.forEach(linha => res.write(`data: [ERRO] ${linha}\n\n`));
  });

  processo.on('close', code => {
    res.write(`data: [✔️] Teste finalizado com sucesso.\n\n`);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`[+] Servidor escutando em http://localhost:${port}`);
});
