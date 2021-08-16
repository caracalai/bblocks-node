const { Logger } = require('../../lib/Logger/logger');
const { NodeBase } = require('../../lib/NodeBase');

class Summator extends NodeBase {
  constructor() {
    super();
    this.registerHandler('first', this.onFirst.bind(this));
    this.registerHandler('second', this.onSecond.bind(this));
    this.firstQueue = [];
    this.secondQueue = [];
    this.runInterval = null;
  }

  async onFirst(msg) {
    Logger.debug(`on_first: Received ${msg.value}`);
    this.firstQueue.push(msg.value);
    await this.processQueues();
  }

  async onSecond(msg) {
    Logger.debug(`on_second: Received ${msg.value}`);
    this.secondQueue.push(msg.value);
    await this.processQueues();
  }

  async processQueues() {
    while (this.firstQueue.length && this.secondQueue.length) {
      const first = this.firstQueue.shift();
      const second = this.secondQueue.shift();
      Logger.debug(`Sum of ${first} and ${second} is ${first + second}`);
    }
  }

  async stop() {
    clearInterval(this.runInterval);
  }
}

module.exports = { Summator };
