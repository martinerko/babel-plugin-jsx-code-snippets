const React = require('react');
const ReactDOMServer = require('react-dom/server');

function render(fixture) {
  const elem = React.createElement(fixture);
  return ReactDOMServer.renderToString(elem);
}

module.exports = {
  render
};
