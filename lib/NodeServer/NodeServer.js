const zmq = require('zeromq');
const { isSubsetOf } = require('../utils/helpers');
const { Logger } = require('../Logger/logger');

const CMD = {
  REGISTER: 'register',
  READY_TO_WORK: 'ready-to-work',
  GENERATE_NEXT_MESSAGE_IDX: 'generate-next-message-index',
};

class NodeServer {
  constructor(config, port) {
    this.context = new zmq.Context();
    this.socket = new zmq.Reply({ context: this.context });

    this.config = config;
    // this.stopped = false;
    // this.worker = null;
    this.initialized_nodes = new Set();
    this.next_msg_index = 0;
    this.socket_port = port || -1;
  }

  async bindPort() {
    if (this.socket_port > 0) {
      await this.socket.bind(`tcp://127.0.0.1:${this.socket_port}`);
    } else {
      await this.socket.bind('tcp://127.0.0.1:*');
    }
  }

  getEndpoint() {
    return this.socket.lastEndpoint;
  }

  async start() {
    await this.bindPort(this.socket_port);
    Logger.info('Started execution');
    this.execute();
  }

  async execute() {
    // eslint-disable-next-line no-restricted-syntax
    for await (const [msg] of this.socket) {
      const request = JSON.parse(msg.toString());

      const { command } = request;

      switch (command) {
        case CMD.REGISTER:
          await this.processRegisterNodeRequest(request);
          break;
        case CMD.READY_TO_WORK:
          await this.processReadyToWorkRequest(request);
          break;
        case CMD.GENERATE_NEXT_MESSAGE_IDX:
          await this.processGenerateNextMessageIdxRequest();
          break;
        default:
          await this.processFailedRequest();
          break;
      }
    }
  }

  async processFailedRequest() {
    Logger.debug('NodeServer: Failed request');
    await this.socket.send(JSON.stringify({ success: false }));
  }

  async processGenerateNextMessageIdxRequest() {
    await this.socket.send(JSON.stringify({ index: this.next_msg_index }));
    this.next_msg_index += 1;
  }

  async processReadyToWorkRequest(request) {
    const { id } = request;
    Logger.debug(`NodeServer: Node ${id} is ready to work`);

    await this.socket.send(JSON.stringify({ success: true }));
    this.initialized_nodes.add(request.id);
    const graphNodeIds = new Set(Object.keys(this.config.nodes));

    if (isSubsetOf(graphNodeIds, this.initialized_nodes)) {
      Logger.debug('NodeServer: all nodes are ready. Starting nodes');
      await this.startNodes();
    }
  }

  async processRegisterNodeRequest(request) {
    const { id } = request;
    Logger.debug('NodeServer: Registration of {}'.format(id));

    this.config.nodes[id].publisher_endpoint = request.publisher_endpoint;
    this.config.nodes[id].service_endpoint = request.service_endpoint;
    await this.socket.send(JSON.stringify({ success: 'true' }));

    if (this.allNodesAreRegistered()) {
      await this.initializeNodes();
    }
  }

  allNodesAreRegistered() {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of Object.values(this.config.nodes)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const param of ['publisher_endpoint', 'service_endpoint']) {
        if (!(param in item && item[param] !== '')) {
          return false;
        }
      }
    }
    return true;
  }

  findEdges({ sourceId = '', destinationId = '' }) {
    let result = Array.from(this.config.edges);
    if (sourceId) {
      result = result.filter((e) => e.source === sourceId);
    }
    if (destinationId) {
      result = result.filter((e) => e.destination === destinationId);
    }
    return result;
  }

  findSourceNodes(destinationId = '') {
    return [...new Set(this.findEdges({ destinationId }).map((e) => e.source))];
  }

  async initializeNodes() {
    Object.entries(this.config.nodes).forEach(([id, node]) => {
      Logger.debug(`${id}: ${node}`);

      const sock = new zmq.Request({ context: this.context });
      sock.connect(node.service_endpoint);
      const nodeConfig = {
        id,
        input_nodes: [],
      };

      const inputNodeIds = this.findSourceNodes(id);

      nodeConfig.input_nodes = inputNodeIds.map((inputNodeId) => ({
        id: inputNodeId,
        publisher_endpoint: this.config.nodes[inputNodeId].publisher_endpoint,
        edges: this.findEdges({
          sourceId: inputNodeId,
          destinationId: id,
        }).map((e) => ({
          event: e.event,
          handler: e.handler,
        })),
      }));
      sock.send(JSON.stringify(nodeConfig));

      sock.close();
    });
  }

  async startNodes() {
    await Promise.all(Object.entries(this.config.nodes).map(async ([id, node]) => {
      const sock = new zmq.Request({ context: this.context });
      sock.connect(node.service_endpoint);
      await sock.send(JSON.stringify({ id, start: true }));
    }));
  }
}
module.exports = { NodeServer };
