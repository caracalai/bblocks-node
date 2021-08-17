const { NodeBase } = require('../../lib/NodeBase');

class GeneratorB extends NodeBase {
  constructor() {
    super();
    this.registerEvent('value');
    this.runInterval = null;
  }

  run() {
    let idx = 228;
    this.runInterval = setInterval(() => {
      this.generateEvent('value', idx);
      idx += 1;
    }, 1000);
  }

  stop() {
    super.stop();
    clearInterval(this.runInterval);
  }
}

module.exports = { GeneratorB };
