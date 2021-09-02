const { BasicType } = require('./BasicType');
const { BASIC_TYPES } = require('./proto/basictypes');

class Image extends BasicType {
  constructor({ data, height, width }) {
    super();
    this.type = BASIC_TYPES.IMAGE_VALUE;
    this.data = data;
    this.height = height;
    this.width = width;
  }
}

module.exports = {
  Image,
};
