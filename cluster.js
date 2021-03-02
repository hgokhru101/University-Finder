const express = require('express');
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();
  app.get('/', (req, res) => 
  res.send('Hello World!' + cluster.worker.id)
  );
  http.createServer(app).listen(3000, function () {
    console.log("Express server listening on port 3000 as Worker " + cluster.worker.id + " running @ process " + cluster.worker.process.pid + "!");
  });

}
