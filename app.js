import express from 'express';
import { spawn } from 'child_process';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/executar', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  const processo = spawn('bash', ['./run.sh']);

  processo.stdout.on('data', (data) => {
    res.write(`data: ${data.toString()}\n\n`);
  });

  processo.stderr.on('data', (data) => {
    res.write(`data: [ERRO] ${data.toString()}\n\n`);
  });

  processo.on('close', () => {
    res.write('data: [✔️] Teste finalizado com sucesso.\n\n');
    res.end();
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
