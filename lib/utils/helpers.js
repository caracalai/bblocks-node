function isSubsetOf(subset, set) {
  return [...subset].every((element) => set.has(element));
}

function mergeArrays(a, b) {
  const c = new a.constructor(a.length + b.length);
  c.set(a);
  c.set(b, a.length);
  return c;
}

const RANDOM_TCP_LOCALHOST_ENDPOINT = 'tcp://127.0.0.1:*';
const SPACE_BYTE = 32;

module.exports = {
  isSubsetOf, mergeArrays, RANDOM_TCP_LOCALHOST_ENDPOINT, SPACE_BYTE,
};
