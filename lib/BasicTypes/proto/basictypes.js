const {
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
} = require('./build/basictypes_pb');

const { Camera } = require('../Camera');
const { Image } = require('../Image');
const { Tuple } = require('../Tuple');

const BASIC_TYPES = {
  MESSAGE: 'BasicTypes.Message',
  IMAGE_VALUE: 'BasicTypes.ImageValue',
  STRING_VALUE: 'BasicTypes.StringValue',
  BOOLEAN_VALUE: 'BasicTypes.BooleanValue',
  INT_VALUE: 'BasicTypes.IntValue',
  FLOAT_VALUE: 'BasicTypes.FloatValue',
  CAMERA_VALUE: 'BasicTypes.CameraValue',
  TUPLE_VALUE: 'BasicTypes.TupleValue',
  LIST_VALUE: 'BasicTypes.ListValue',
  ANY: 'google.protobuf.Any',
};

const TYPE2PROTOBUF_CONSTRUCTOR = {
  [BASIC_TYPES.INT_VALUE]: IntValue,
  [BASIC_TYPES.BOOLEAN_VALUE]: BooleanValue,
  [BASIC_TYPES.FLOAT_VALUE]: FloatValue,
  [BASIC_TYPES.STRING_VALUE]: StringValue,
  [BASIC_TYPES.TUPLE_VALUE]: TupleValue,
  [BASIC_TYPES.LIST_VALUE]: ListValue,
  [BASIC_TYPES.MESSAGE]: Message,
  [BASIC_TYPES.IMAGE_VALUE]: ImageValue,
  [BASIC_TYPES.CAMERA_VALUE]: CameraValue,
  [BASIC_TYPES.ANY]: Any,
};

const TYPE2INNER_CLASS_CONSTRUCTOR = {
  [BASIC_TYPES.TUPLE_VALUE]: Tuple,
  [BASIC_TYPES.IMAGE_VALUE]: Image,
  [BASIC_TYPES.CAMERA_VALUE]: Camera,
};

module.exports = {
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
