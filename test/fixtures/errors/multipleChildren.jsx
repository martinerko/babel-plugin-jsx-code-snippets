/* eslint-disable no-unused-vars */
const React = require('react');

module.exports = () => (
  <div>
    I will try to duplicate this content:
    <SnippetSource code="snippet1">
      <p>Let's try it!</p>
      <p>
        ...but this will throw an error because content of the snippet source
          should be wrapped in one single parent.
      </p>
    </SnippetSource>
    here:
    <SnippetTarget code="snippet1" />
    <p>Remember, always wrap the content of the snippet source in single parent element!</p>
  </div>
);
