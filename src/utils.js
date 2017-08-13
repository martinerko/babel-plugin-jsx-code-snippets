const { SOURCE_TAG } = require('./constants');

function getSnippetCodeAttribute(path) {
  // code attribute is mandatory since it helps with pairing source and target
  const [codeAttr] = path.node.openingElement.attributes.filter(attr => attr.name.name === 'code');
  if (!codeAttr) {
    throw path.buildCodeFrameError(
      `
      ${path.node.openingElement.name.name} element requires "code" attribute to be a non-empty string.`
    );
  }
  return codeAttr;
}

function getChildren(path, babel) {
  const children = babel.types.react.buildChildren(path.node);
  if (!children.length) {
    throw path.buildCodeFrameError(
      `
      ${SOURCE_TAG} element expects at least 1 child.
      ${path.node.children.length > 1 ? 'Tip: simply wrap your nested elements into one parent <div> element.' : ''}`
    );
  }
  return children;
}

function replace(path, node) {
  path.replaceWith(node);
}

module.exports = {
  getSnippetCodeAttribute,
  getChildren,
  replace
};
