const express = require('express');
const os = require('os');

const PORT = process.env.PORT || 8080;
const app = express();

let healthy = true;

app.get('/', (req, res) => {
  res.send(`Welcome App [version: 2 - ${os.hostname()}]\n`);
});

app.get('/healthz', (req, res) => {
  console.log('health check');
  if (healthy) {
    res.send('OK');
  } else {
    res.status(503).send('NOT OK');
  }
});

app.get('/kill', (req, res) => {
  healthy = false;
  res.send(`Killed ${os.hostname()}`);
});

const server = app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});

const gracefulShutdown = () => {
  console.log('Received shutdown signal, closing server gracefully...');
  server.close(() => {
    console.log('Server closed. Exiting process.');
    process.exit(0);
  });
  
  // Force close after 10 seconds
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
