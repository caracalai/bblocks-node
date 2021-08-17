const { NodeServer } = require('../NodeServer');

class NodeCluster {
  constructor(name, config) {
    this.name = name;
    this.config = config;
    this.server_node = null;
    this.nodes = [];
  }

  // eslint-disable-next-line no-unused-vars,class-methods-use-this
  createNode(name) {
    throw new Error('Undefined method');
  }

  stop() {
    this.server_node.stop();
    this.nodes.forEach((n) => n.stop());
  }

  async start({ serverEndpoint = '', serverPort = '' }) {
    const isFactory = this.name === this.config['server-fabric'];
    if (isFactory) {
      this.server_node = new NodeServer(this.config, serverPort);
      await this.server_node.start();
    }
    Object.entries(this.config.nodes).forEach(([id, nodeInfo]) => {
      if (nodeInfo.type.fabric === this.name) {
        const node = this.createNode(nodeInfo.type.name);
        node.setId(id);
        node.setServerEndpoint(
          isFactory ? this.server_node.getEndpoint() : serverEndpoint,
        );
        node.start();
        this.nodes.push(node);
      }
    });
  }
}

module.exports = { NodeCluster };
