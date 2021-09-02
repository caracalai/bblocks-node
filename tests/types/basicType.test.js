const {
  Tuple, Camera, Image, BasicType,
} = require('../../index');

test('Basic type test', () => {
  const camera = new Camera({});
  const image = new Image({});
  const tuple = new Tuple({});
  expect(camera instanceof BasicType).toBeTruthy();
  expect(image instanceof BasicType).toBeTruthy();
  expect(tuple instanceof BasicType).toBeTruthy();
});
