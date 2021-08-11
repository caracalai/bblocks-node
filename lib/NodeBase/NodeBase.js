import { Worker } from 'worker_threads';

const zmq = require('zeromq');

class NodeBase {
  constructor() {
    this.worker = null;
    this.stopped = false;
    this.context = new zmq.Context();
    this.subSocket = null;
    this.pubSocket = null;
    this.serviceSocket = null;
    this.event2handler = {};
    this.serverEndpoint = '';
    this.handlers = {};
    this.events = new Set();
  }

  start() {
    this.worker = new Worker(this.execute);
    this.worker.start();
  }

  execute() {
    return this.stopped;
  }
}

module.exports = { NodeBase };
