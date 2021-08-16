/* eslint-disable global-require,no-await-in-loop, no-unreachable */
const { Camera, Tuple, Image } = require('../../lib/BasicTypes');
const { Logger } = require('../../lib/Logger/logger');
const { Serializer } = require('../../lib/BasicTypes/Serializer');

const serializerTests = () => {
  const int = Serializer.serializeValue(1);
  console.log(int);
  console.log(Serializer.deserializeValue(int));

  const float = Serializer.serializeValue(1.2);
  console.log(float);
  console.log(Serializer.deserializeValue(float));

  const string = Serializer.serializeValue('Test');
  console.log(string);
  console.log(Serializer.deserializeValue(string));

  const bool = Serializer.serializeValue(true);
  console.log(bool);
  console.log(Serializer.deserializeValue(bool));

  console.log(Serializer.serializeValue([]));
  console.log(Serializer.serializeValue(new Tuple({ items: [] })));

  const camera = Serializer.serializeValue(new Camera({
    url: 'URL',
  }));
  console.log(camera.getUrl());
  console.log(Serializer.deserializeValue(camera));

  const image = Serializer.serializeValue(new Image({
    image: 'imageData',
    width: 1200,
    height: 700,
  }));
  console.log(image.getData());
  console.log(image.getWidth());
  console.log(image.getHeight());
  console.log(Serializer.deserializeValue(image));

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

run();
