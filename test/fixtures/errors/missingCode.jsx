/* eslint-disable no-unused-vars */
const React = require('react');

module.exports = () => (
  <div>
    I will try to duplicate this content:
    <SnippetSource>
      <p>...but this will throw an error because we don't have any code attribute!</p>
    </SnippetSource>
    here:
    <SnippetTarget code="snippet1" />
    <p>Remember, code attribute is mandatory!</p>
  </div>
);
