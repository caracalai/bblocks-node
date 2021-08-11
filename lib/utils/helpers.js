function isSubsetOf(subset, set) {
  return [...subset].every((element) => set.has(element));
}

module.exports = { isSubsetOf };
