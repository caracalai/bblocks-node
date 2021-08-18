/* eslint-disable no-useless-return,class-methods-use-this,no-restricted-syntax */

const zmq = require('zeromq');
const { Serializer } = require('../BasicTypes');
const { RANDOM_TCP_LOCALHOST_ENDPOINT, SPACE_BYTE } = require('../utils/helpers');
const { mergeArrays } = require('../utils/helpers');
const { Logger } = require('../Logger/logger');
const { NODE_SERVER_CMD } = require('../NodeServer');
const { Message } = require('../BasicTypes/proto/build/basictypes_pb');

const Encoder = new TextEncoder();
const Decoder = new TextDecoder();

class NodeBase {
  constructor() {
    this.id = null;
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
    this.clusterId = null;
  }

  setId(id) {
    this.id = id;
  }

  setServerEndpoint(serverEndpoint = '') {
    this.serverEndpoint = serverEndpoint;
  }

  setClusterId(clusterId) {
    this.clusterId = clusterId;
  }

  async initialize() {
    return;
  }

  async run() {
    return;
  }

  registerEvent(name) {
    this.events.add(name);
  }

  registerHandler(name, handler) {
    this.handlers[name] = handler;
  }

  async messageId() {
    const sock = new zmq.Request({ context: this.context });
    sock.connect(this.serverEndpoint);
    await sock.send(JSON.stringify({ command: NODE_SERVER_CMD.GENERATE_NEXT_MESSAGE_IDX }));
    const [result] = await sock.receive();
    const message = JSON.parse(result.toString());
    return parseInt(message.index, 10);
  }

  async generateEvent(event, value, msgId) {
    if (!this.events.has(event)) {
      Logger.warn(`Node ${this.id}: Couldn't generate event. Error: undefined event ${event}'`);
      return;
    }

    const id = msgId || await this.messageId();

    Logger.debug(`Node ${this.id}:send event`);

    let message = Serializer.serializeMessage(id, value);
    const prefix = `${this.id}|${event} `;
    message = message.serializeBinary();
    message = mergeArrays(Encoder.encode(prefix), message);

    this.pubSocket.send(message);
  }

  async waitAnswerFromServer() {
    for await (let [msg] of this.serviceSocket) {
      msg = JSON.parse(msg.toString());

      this.serviceSocket.send(JSON.stringify({ success: 'true' }));
      if (msg != null) return msg;
    }
    return null;
  }

  async initializeListener() {
    this.subSocket = new zmq.Subscriber({ context: this.context });
    for (const item of this.config.input_nodes) {
      this.subSocket.connect(item.publisher_endpoint);
      item.edges.forEach((edge) => {
        const topic = `${item.id}|${edge.event}`;
        this.subSocket.subscribe(topic);
        this.event2handler[`${item.id}|${edge.event}`] = this.handlers[edge.handler];
      });
    }
    // this.processEvents();
  }

  async sendCommand(message) {
    const sock = new zmq.Request();
    sock.connect(this.serverEndpoint);
    await sock.send(message);
    sock.close();
  }

  async processEvents() {
    if (!Object.keys(this.event2handler).length) return;
    for await (let [msg] of this.subSocket) {
      if (this.stopped) break;
      msg = new Uint8Array(msg);
      const firstSpaceIdx = msg.findIndex((b) => b === SPACE_BYTE);
      const event = Decoder.decode(msg.subarray(0, firstSpaceIdx));
      const message = Message.deserializeBinary(msg.subarray(firstSpaceIdx + 1, msg.length));
      this.event2handler[event](Serializer.deserializeMessage(message));
    }
  }

  async start() {
    Logger.info(`Started executing node ${this.id}`);
    await this.execute();
  }

  stop() {
    Logger.info(`Stopping executing node ${this.id}`);
    this.stopped = true;
    if (this.subSocket) {
      this.subSocket.close();
    }
    if (this.pubSocket) {
      this.pubSocket.close();
    }
  }

  async execute() {
    await this.initialize();
    await this.initializePublisherSocket();
    await this.initializeServiceSocket();
    await this.registerNodeOnServer();
    await this.initializeListener();
    await this.sendReadyToWork();
    this.run();
    this.processEvents();
  }

  async registerNodeOnServer() {
    await this.sendCommand(JSON.stringify({
      command: NODE_SERVER_CMD.REGISTER,
      id: this.id,
      publisher_endpoint: this.pubSocket.lastEndpoint,
      service_endpoint: this.serviceSocket.lastEndpoint,
    }));

    this.config = await this.waitAnswerFromServer();
  }

  async sendReadyToWork() {
    await this.sendCommand(JSON.stringify({
      command: NODE_SERVER_CMD.READY_TO_WORK,
      id: this.id,
    }));

    await this.waitAnswerFromServer();
  }

  async initializePublisherSocket() {
    this.pubSocket = new zmq.Publisher({ context: this.context });
    await this.pubSocket.bind(RANDOM_TCP_LOCALHOST_ENDPOINT);
    Logger.info(`Pub socket of Node ${this.id} is bound to ${this.pubSocket.lastEndpoint}`);
  }

  async initializeServiceSocket() {
    this.serviceSocket = new zmq.Reply();
    await this.serviceSocket.bind(RANDOM_TCP_LOCALHOST_ENDPOINT);
    Logger.info(`Service socket of Node ${this.id} is bound to ${this.serviceSocket.lastEndpoint}`);
  }
}

module.exports = { NodeBase };
