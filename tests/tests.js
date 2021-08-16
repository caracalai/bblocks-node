/* eslint-disable global-require,no-await-in-loop, no-unreachable */

const {
  Message, CameraValue, IntValue, Any,
} = require('../lib/BasicTypes/proto/build/basictypes_pb');
const { Logger } = require('../lib/Logger/logger');

const nodeBaseTest = async () => {
  const { NodeBase } = require('../lib/NodeBase');
  const nodeBase = new NodeBase();
  nodeBase.events.add('event');
  const camera = new CameraValue();
  camera.setUrl('123');
  await nodeBase.generateEvent('event', camera, 4);
};

const run = async () => {
  await nodeBaseTest();

  const { NodeServer } = require('../lib/NodeServer');

  const { graph } = require('./summator/graph');

  const nodeServer = new NodeServer(graph, 1337);

  await nodeServer.start();

  Logger.info(nodeServer);

  Logger.info(nodeServer.getEndpoint());

  const zmq = require('zeromq');

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    const sock = new zmq.Request();
    sock.connect(nodeServer.getEndpoint());
    await sock.send(JSON.stringify({ command: 'generate-next-message-index' }));
    const [result] = await sock.receive();
    Logger.info(JSON.parse(result.toString()));
    sock.disconnect(nodeServer.getEndpoint());
  }

  const int = new IntValue();
  int.setValue(1);
  console.log(int.serializeBinary());
  const camera = new CameraValue();
};

run();
