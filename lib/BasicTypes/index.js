const {
  BASIC_TYPES,
  TYPE2PROTOBUF_CONSTRUCTOR,
  TYPE2INNER_CLASS_CONSTRUCTOR,
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
const { Camera } = require('./Camera');
const { Image } = require('./Image');
const { Serializer } = require('./Serializer');
const { Tuple } = require('./Tuple');

module.exports = {
  Image,
  Camera,
  Serializer,
  Tuple,
  BASIC_TYPES,
  TYPE2PROTOBUF_CONSTRUCTOR,
  TYPE2INNER_CLASS_CONSTRUCTOR,
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
};
