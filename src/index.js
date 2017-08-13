const { getSnippetCodeAttribute, getChildren } = require('./utils');
const { SOURCE_TAG, TARGET_TAG } = require('./constants');

module.exports = function jsxCodeSnippetsPlugin(babel) {
  const visitor = {
    JSXElement: (path) => {
      const nodeName = path.node.openingElement.name.name;

      if (nodeName === SOURCE_TAG || nodeName === TARGET_TAG) {
        const code = getSnippetCodeAttribute(path);

        if (nodeName === SOURCE_TAG) {
          const children = getChildren(path, babel);

          // check if related target has been already processed
          if (code in this.cache[TARGET_TAG]) {
            this.cache[TARGET_TAG][code].path.replaceWithMultiple(children);
            this.cache[TARGET_TAG][code] = undefined;
          } else {
            this.cache[SOURCE_TAG][code] = {
              children
            };
          }
          // we also need to remove (replace) SOURCE_TAG node, because it's not real html element
          path.replaceWithMultiple(children);
        } else if (code in this.cache[SOURCE_TAG]) {
          path.replaceWithMultiple(this.cache[SOURCE_TAG][code].children);
        } else {
          this.cache[TARGET_TAG][code] = {
            path
          };
        }
      }
    }
  };

  return {
    inherits: require('babel-plugin-syntax-jsx'),
    pre: () => {
      this.cache = {
        [SOURCE_TAG]: {},
        [TARGET_TAG]: {}
      };
    },
    visitor,
    post: () => {
      const targets = this.cache[TARGET_TAG];
      Object.keys(targets).filter(code => targets[code]).forEach((code) => {
        throw targets[code].path.buildCodeFrameError(`There is no matching ${SOURCE_TAG} element with code ${code}`);
      });
      this.cache = undefined;
    }
  };
};
