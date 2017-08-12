function getSnippetCodeAttribute(path) {
  // code attribute is mandatory since it helps with pairing source and target
  const [code] = path.node.openingElement.attributes.filter(attr => attr.name.name === 'code');
  if (!code) {
    throw path.buildCodeFrameError(
      `
      ${path.node.openingElement.name.name} element requires "code" attribute to be a non-empty string.`
    );
  }
  return code.value.value;
}

function getChildren(path, babel) {
  const children = babel.types.react.buildChildren(path.node);
  if (children.length !== 1) {
    throw path.buildCodeFrameError(
      `
      ${path.node.openingElement.name.name} element expects 1 child.
      ${path.node.children.length > 1 ? 'Tip: simply wrap your nested elements into one parent <div> element.' : ''}`
    );
  }
  return children;
}

module.exports = {
  getSnippetCodeAttribute,
  getChildren
};
