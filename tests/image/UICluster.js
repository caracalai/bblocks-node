const { ShowFaceWebView } = require('./ShowFaceWebView');
const { NodeCluster } = require('../../lib/NodeCluster');

const UI_CLUSTER_NODES = {
  SHOW_FACE_VIEW: 'ShowDetectedFaceWebView',
};

class UICluster extends NodeCluster {
  // eslint-disable-next-line class-methods-use-this
  createNode(name) {
    switch (name) {
      case UI_CLUSTER_NODES.SHOW_FACE_VIEW:
        return new ShowFaceWebView();
      default:
        throw Error(`Undefined node: ${name}`);
    }
  }
}

module.exports = {
  UICluster,
};
