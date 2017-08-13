const { getSnippetCodeAttribute, /* getChildren, */ replace } = require('./utils');
const { SOURCE_TAG, TARGET_TAG } = require('./constants');

module.exports = function jsxCodeSnippetsPlugin(/* babel */) {
  const visitor = {
    JSXElement: (path) => {
      const { openingElement, closingElement } = path.node;
      const nodeName = openingElement.name.name;

      if (nodeName === SOURCE_TAG || nodeName === TARGET_TAG) {
        const codeAttr = getSnippetCodeAttribute(path);
        const code = codeAttr.value.value;

        // rename attribute to be html5 compliant
        openingElement.name.name = 'div';
        if (closingElement) {
          closingElement.name.name = 'div';
        }

        // rename attribute to be html5 compliant
        codeAttr.name.name = 'data-snippet-code';

        if (nodeName === SOURCE_TAG) {
          const children = path; // getChildren(path, babel);

          // check if related target has been already processed
          if (code in this.cache[TARGET_TAG]) {
            replace(this.cache[TARGET_TAG][code], children);
            // this.cache[TARGET_TAG][code].replaceWithMultiple(children);
            this.cache[TARGET_TAG][code] = undefined;
          } else {
            this.cache[SOURCE_TAG][code] = children;
          }
        } else if (code in this.cache[SOURCE_TAG]) {
          replace(path, this.cache[SOURCE_TAG][code]);
          // path.replaceWithMultiple(this.cache[SOURCE_TAG][code]);
        } else {
          this.cache[TARGET_TAG][code] = path;
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
        throw targets[code].buildCodeFrameError(`There is no matching ${SOURCE_TAG} element with code ${code}`);
      });
      this.cache = undefined;
    }
  };
};
