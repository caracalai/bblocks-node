/* eslint-disable global-require,no-await-in-loop, no-unreachable */
const { BASIC_TYPES } = require('../../lib/BasicTypes/proto/basictypes');
const { SummatorCluster } = require('./SummatorCluster');
const { Logger } = require('../../lib/Logger/logger');
const {
  IntValue, Message, Any, ListValue,
} = require('../../lib/BasicTypes/proto/build/basictypes_pb');
const { graph } = require('./graph');

const runSummator = async () => {
  const serverEndpoint = 'tcp://127.0.0.1:2000';
  const serverPort = 2000;

  const myCluster = new SummatorCluster('nodejs-service', graph);
  myCluster.start({ serverPort, serverEndpoint });
};

const run = async () => {
  runSummator();
};

run();
