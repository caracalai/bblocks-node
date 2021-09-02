const { BasicType } = require('./BasicType');
const { BASIC_TYPES } = require('./proto/basictypes');

class Camera extends BasicType {
  constructor({ url }) {
    super();
    this.type = BASIC_TYPES.CAMERA_VALUE;
    this.url = url;
  }
}

module.exports = {
  Camera,
};
