const graph = {
  'server-fabric': 'nodejs-service',
  nodes: {
    'GeneratorA_d79073f9-6f94-49a7-a4c5-e2783647928f': {
      type: {
        name: 'GeneratorA',
        fabric: 'nodejs-service',
      },
    },
    'GeneratorB_6f865f02-0d91-47b0-aa40-a65867bd5afd': {
      type: {
        name: 'GeneratorB',
        fabric: 'nodejs-service',
      },
    },
    'Summator_7c444c17-9311-4b8a-b34b-14534a2f22a5': {
      type: {
        name: 'Summator',
        fabric: 'python-service',
      },
    },
  },
  edges: [
    {
      source: 'GeneratorA_d79073f9-6f94-49a7-a4c5-e2783647928f',
      event: 'value',
      destination: 'Summator_7c444c17-9311-4b8a-b34b-14534a2f22a5',
      handler: 'first',
    },
    {
      source: 'GeneratorB_6f865f02-0d91-47b0-aa40-a65867bd5afd',
      event: 'value',
      destination: 'Summator_7c444c17-9311-4b8a-b34b-14534a2f22a5',
      handler: 'second',
    },
  ],
};

module.exports = { graph };
