const { BasicType } = require('./BasicType');
const { BASIC_TYPES } = require('./proto/basictypes');

class Tuple extends BasicType {
  constructor({ items }) {
    super();
    this.type = BASIC_TYPES.TUPLE_VALUE;
    this.items = items;
  }
}

module.exports = {
  Tuple,
};
