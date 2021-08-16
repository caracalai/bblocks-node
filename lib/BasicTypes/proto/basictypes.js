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

const TYPE2CONSTRUCTOR = {};

TYPE2CONSTRUCTOR[BASIC_TYPES.INT_VALUE] = IntValue;
TYPE2CONSTRUCTOR[BASIC_TYPES.BOOLEAN_VALUE] = BooleanValue;
TYPE2CONSTRUCTOR[BASIC_TYPES.FLOAT_VALUE] = FloatValue;
TYPE2CONSTRUCTOR[BASIC_TYPES.STRING_VALUE] = StringValue;
TYPE2CONSTRUCTOR[BASIC_TYPES.TUPLE_VALUE] = TupleValue;
TYPE2CONSTRUCTOR[BASIC_TYPES.LIST_VALUE] = ListValue;
TYPE2CONSTRUCTOR[BASIC_TYPES.MESSAGE] = Message;
TYPE2CONSTRUCTOR[BASIC_TYPES.IMAGE_VALUE] = ImageValue;
TYPE2CONSTRUCTOR[BASIC_TYPES.CAMERA_VALUE] = CameraValue;
TYPE2CONSTRUCTOR[BASIC_TYPES.ANY] = Any;

module.exports = {
  BASIC_TYPES,
  TYPE2CONSTRUCTOR,
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
