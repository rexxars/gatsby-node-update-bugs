module.exports = function getSlug(node) {
  return node.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}
