const { Camera } = require('./Camera');
const { Image } = require('./Image');
const { Tuple } = require('./Tuple');

const {
  BASIC_TYPES, TYPE2CONSTRUCTOR,
  Message,
  ImageValue,
  StringValue,
  BooleanValue,
  IntValue,
  FloatValue,
  CameraValue,
  TupleValue,
  ListValue,
  Any,
} = require('./proto/basictypes');

class Serializer {
  static getTypeByValue(value) {
    if (typeof value === 'string') {
      return BASIC_TYPES.STRING_VALUE;
    }
    if (typeof value === 'number') {
      if (Number.isInteger(value)) {
        return BASIC_TYPES.INT_VALUE;
      }
      return BASIC_TYPES.FLOAT_VALUE;
    }
    if (typeof value === 'boolean') {
      return BASIC_TYPES.FLOAT_VALUE;
    }
    if (value instanceof Array) {
      return BASIC_TYPES.LIST_VALUE;
    }
    if (value instanceof Tuple) {
      return BASIC_TYPES.TUPLE_VALUE;
    }
    if (value instanceof Image) {
      return BASIC_TYPES.IMAGE_VALUE;
    }
    if (value instanceof Camera) {
      return BASIC_TYPES.CAMERA_VALUE;
    }
    throw Error('Cannot serialize');
  }

  static serializeValue(value) {
    if (typeof value === 'string') {
      const res = new StringValue();
      res.setValue(value);
      return res;
    }
    if (typeof value === 'number') {
      if (Number.isInteger(value)) {
        const res = new IntValue();
        res.setValue(value);
        return res;
      }
      const res = new FloatValue();
      res.setValue(value);
      return res;
    }
    if (typeof value === 'boolean') {
      const res = new BooleanValue();
      res.setValue(value);
      return res;
    }
    if (value instanceof Array) {
      const res = new ListValue();
      value.forEach((e) => {
        res.addItems(Serializer.serializeValue(e));
      });
      return res;
    }
    if (value instanceof Tuple) {
      const res = new TupleValue();
      value.items.forEach((e) => {
        res.addItems(Serializer.serializeValue(e));
      });
      return res;
    }
    if (value instanceof Image) {
      const res = new ImageValue();
      res.setData(value.image);
      res.setWidth(value.width);
      res.setHeight(value.height);
      return res;
    }
    if (value instanceof Camera) {
      const res = new CameraValue();
      res.setUrl(value.url);
      return res;
    }
    throw Error('Cannot serialize');
  }

  static deserializeAny(value) {
    const valueTypeName = value.getTypeName();
    return Serializer.deserializeValue(value.unpack(
      TYPE2CONSTRUCTOR[valueTypeName].deserializeBinary,
      valueTypeName,
    ));
  }

  static deserializeValue(value) {
    if (value instanceof StringValue) {
      return value.getValue();
    }
    if (value instanceof IntValue) {
      return value.getValue();
    }
    if (value instanceof FloatValue) {
      return value.getValue();
    }
    if (value instanceof BooleanValue) {
      return value.getValue();
    }
    if (value instanceof ListValue) {
      return value.getItemsList().map((item) => Serializer.deserializeValue(item));
    }
    if (value instanceof TupleValue) {
      return value.getItemsList().map((item) => Serializer.deserializeValue(item));
    }
    if (value instanceof ImageValue) {
      return new Image({
        image: value.getData(),
        width: value.getWidth(),
        height: value.getHeight(),
      });
    }
    if (value instanceof CameraValue) {
      return new Camera({
        url: value.getUrl(),
      });
    }
    throw Error('Cannot deserialize');
  }

  static serializeMessage(id, value) {
    const message = new Message();
    message.setId(id);
    const messageValue = new Any();
    messageValue.pack(
      Serializer.serializeValue(value).serializeBinary(),
      Serializer.getTypeByValue(value),
    );
    message.setValue(messageValue);
    return message;
  }

  static deserializeMessage(message) {
    const id = message.getId();
    const value = Serializer.deserializeAny(message.getValue());
    return {
      id, value,
    };
  }
}

module.exports = { Serializer };
