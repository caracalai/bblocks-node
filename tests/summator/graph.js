const graph = {
  'server-fabric': 'nodejs-service',
  nodes: {
    'GeneratorA_01e74be0-2f4f-438d-bca1-b9fd5db5b6cb': {
      type: {
        name: 'GeneratorA',
        fabric: 'nodejs-service',
      },
    },
    'GeneratorB_4adbf5fb-8e66-4aa6-950b-c981a6de4af5': {
      type: {
        name: 'GeneratorB',
        fabric: 'nodejs-service',
      },
    },
    'Summator_16c68928-e1d9-4da6-b9a7-06650cfa6d8b': {
      type: {
        name: 'Summator',
        fabric: 'nodejs-service',
      },
    },
  },
  edges: [
    {
      source: 'GeneratorA_01e74be0-2f4f-438d-bca1-b9fd5db5b6cb',
      event: 'value',
      destination: 'Summator_16c68928-e1d9-4da6-b9a7-06650cfa6d8b',
      handler: 'first',
    },
    {
      source: 'GeneratorB_4adbf5fb-8e66-4aa6-950b-c981a6de4af5',
      event: 'value',
      destination: 'Summator_16c68928-e1d9-4da6-b9a7-06650cfa6d8b',
      handler: 'second',
    },
  ],
};

module.exports = { graph };
