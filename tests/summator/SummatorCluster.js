const { NodeCluster } = require('../../lib/NodeCluster/NodeCluster');
const { Summator } = require('./Summator');
const { GeneratorB } = require('./GeneratorB');
const { GeneratorA } = require('./GeneratorA');

const SUMMATOR_CLUSTER_NODES = {
  GENERATOR_A: 'GeneratorA',
  GENERATOR_B: 'GeneratorB',
  SUMMATOR: 'Summator',
};

class SummatorCluster extends NodeCluster {
  // eslint-disable-next-line class-methods-use-this
  createNode(name) {
    switch (name) {
      case SUMMATOR_CLUSTER_NODES.GENERATOR_A:
        return new GeneratorA();
      case SUMMATOR_CLUSTER_NODES.GENERATOR_B:
        return new GeneratorB();
      case SUMMATOR_CLUSTER_NODES.SUMMATOR:
        return new Summator();
      default:
        throw Error(`Undefined node: ${name}`);
    }
  }
}

module.exports = {
  SummatorCluster,
  SUMMATOR_CLUSTER_NODES,
};
