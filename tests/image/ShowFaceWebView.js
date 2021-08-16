const { NodeBase } = require('../../lib/NodeBase');

class ShowFaceWebView extends NodeBase {
  constructor() {
    super();
    this.registerHandler('processed_image', this.onProcessedImage.bind(this));
  }

  // eslint-disable-next-line class-methods-use-this
  onProcessedImage(message) {
    console.log(Buffer.from(message.value[0].image).toString('base64'));
  }
}

module.exports = {
  ShowFaceWebView,
};
