/* eslint-disable */
const { Logger } = require('../lib/Logger/logger');

const run = async () => {
    const { NodeServer } = require('../lib/NodeServer');

    const { graph } = require('./testGraph');

    const nodeServer = new NodeServer(graph, 1337);

    await nodeServer.start();

    Logger.info(nodeServer);

    Logger.info(nodeServer.getEndpoint());

    const zmq = require('zeromq');

    const sock = new zmq.Request();

    sock.connect(nodeServer.getEndpoint());

    sock.send(JSON.stringify({
        "command": "ready-to-work",
        "id": '123'
    })).then(async () => {
        const [result] = await sock.receive();

        Logger.info(JSON.parse(result.toString()));

        sock.disconnect(nodeServer.getEndpoint());
    });
}

run();
