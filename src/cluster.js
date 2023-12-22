const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const PORT = process.env.PORT;

if (cluster.isMaster) {
  const workers = [];
  let currentWorkerIndex = 0;

  // Create workers
  for (let i = 0; i < numCPUs - 1; i++) {
    const worker = cluster.fork();
    workers.push(worker);
  }

  // Load balancer
  const balancer = http.createServer((req, res) => {
    const worker = workers[currentWorkerIndex];
    worker.send({ type: 'request' });

    worker.on('message', (message) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(message);
    });

    currentWorkerIndex = (currentWorkerIndex + 1) % workers.length;
  });

  balancer.listen(PORT, () => {
    console.log(`Load balancer listening on port ${PORT}/api`);
  });
} else {
  // Worker code
  const workerServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Worker ${cluster.worker.id} responding to request`);
  });

  workerServer.listen(PORT + cluster.worker.id, () => {
    console.log(`Worker ${cluster.worker.id} listening on port ${PORT + cluster.worker.id}/api`);
  });

  process.on('message', (msg) => {
    if (msg.type === 'request') {
      process.send(`Worker ${cluster.worker.id} responding to request`);
    }
  });
}
