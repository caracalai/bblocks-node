const graph = {
  'server-fabric': 'nodejs-service',
  nodes: {
    'DragAndDropImageWebView_05a558a3-29b2-43c5-a96e-bb9c5f13dfec': {
      type: {
        name: 'DragAndDropImageWebView',
        fabric: 'ui-service',
      },
    },
    'ShowDetectedFaceWebView_5a6ba535-f61d-434a-ae9a-03aea74dcb2d': {
      type: {
        name: 'ShowDetectedFaceWebView',
        fabric: 'nodejs-service',
      },
    },
    'FaceDetection_b7042c87-c31d-4dc1-9ff7-9a919db0b92f': {
      type: {
        name: 'FaceDetection',
        fabric: 'executor-service',
      },
    },
  },
  edges: [
    {
      source: 'DragAndDropImageWebView_05a558a3-29b2-43c5-a96e-bb9c5f13dfec',
      event: 'image_dropped',
      destination: 'FaceDetection_b7042c87-c31d-4dc1-9ff7-9a919db0b92f',
      handler: 'image',
    },
    {
      source: 'FaceDetection_b7042c87-c31d-4dc1-9ff7-9a919db0b92f',
      event: 'result',
      destination: 'ShowDetectedFaceWebView_5a6ba535-f61d-434a-ae9a-03aea74dcb2d',
      handler: 'processed_image',
    },
  ],
};

module.exports = {
  graph,
};
