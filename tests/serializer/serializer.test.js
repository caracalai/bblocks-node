/* eslint-disable global-require,no-await-in-loop, no-unreachable */
const {
  IntValue,
  Serializer,
  FloatValue,
  BooleanValue,
  TupleValue,
  CameraValue,
  ImageValue,
  ListValue,
  StringValue,
  Camera,
  Tuple,
  Image,
} = require('../../index');

test('Integer serializer test', () => {
  const int = 1;
  const intValue = new IntValue();
  intValue.setValue(int);
  expect(Serializer.serializeValue(int)).toStrictEqual(intValue);
  expect(Serializer.deserializeValue(intValue)).toBe(int);
});

test('Float serializer test', () => {
  const float = 1.2;
  const floatValue = new FloatValue();
  floatValue.setValue(float);
  expect(Serializer.serializeValue(float)).toStrictEqual(floatValue);
  expect(Serializer.deserializeValue(floatValue)).toBe(float);
});

test('String serializer test', () => {
  const string = 'Test string';
  const stringValue = new StringValue();
  stringValue.setValue(string);
  expect(Serializer.serializeValue(string)).toStrictEqual(stringValue);
  expect(Serializer.deserializeValue(stringValue)).toBe(string);
});

test('Boolean serializer test', () => {
  const bool = true;
  const booleanValue = new BooleanValue();
  booleanValue.setValue(bool);
  expect(Serializer.serializeValue(bool)).toStrictEqual(booleanValue);
  expect(Serializer.deserializeValue(booleanValue)).toBe(bool);
});

test('Camera serializer test', () => {
  const url = 'URL';
  const camera = new Camera({
    url,
  });
  const cameraValue = new CameraValue();
  cameraValue.setUrl(url);
  expect(Serializer.serializeValue(camera)).toStrictEqual(cameraValue);
  expect(Serializer.deserializeValue(cameraValue)).toStrictEqual(camera);
});

test('Image serializer test', () => {
  const data = 'imageData';
  const width = 1200;
  const height = 700;
  const imageObject = new Image({
    data,
    width,
    height,
  });
  console.log(imageObject);
  const imageValue = new ImageValue();
  imageValue.setData(data);
  imageValue.setWidth(width);
  imageValue.setHeight(height);
  expect(Serializer.serializeValue(imageObject)).toStrictEqual(imageValue);
  expect(Serializer.deserializeValue(imageValue)).toStrictEqual(imageObject);
});

const serializerTests = () => {
  console.log(Serializer.serializeValue([]));
  console.log(Serializer.serializeValue(new Tuple({ items: [] })));

  const lst = Serializer.serializeValue([1, 2, 3]);
  console.log(lst);
  console.log(Serializer.deserializeAny(lst.getItemsList()[1]));
  console.log(Serializer.deserializeValue(lst));

  const message = Serializer.serializeMessage(1, [1, 2, 3]);

  console.log(Serializer.deserializeMessage(message));

  const tuple = Serializer.serializeValue(new Tuple({ items: [4, 5, 6] }));
  console.log(tuple);
  console.log(Serializer.deserializeAny(tuple.getItemsList()[1]));
  console.log(Serializer.deserializeValue(tuple));
};

const run = async () => {
  serializerTests();
};

// run();
