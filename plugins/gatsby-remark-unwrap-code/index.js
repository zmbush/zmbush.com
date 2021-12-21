const visit = require('unist-util-visit');

module.exports = ({ markdownAST }, _pluginOptions) => {
  visit(markdownAST, 'paragraph', (node, index, parent) => {
    if (
      parent &&
      typeof index === 'number' &&
      node.children &&
      Array.isArray(node.children) &&
      node.children.length === 1 &&
      node.children[0].type === 'html'
    ) {
      parent.children.splice(index, 1, ...node.children);
      return ['skip', index];
    }
    return undefined;
  });
  return markdownAST;
};
