/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const cluster = require('cluster');

// Check the number of available CPU.
const numCPUs = require('os').cpus().length;

// For Master process
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // This event is firs when worker died
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  app.listen(process.env.APP_PORT, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
