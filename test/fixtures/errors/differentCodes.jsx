/* eslint-disable no-unused-vars */
const React = require('react');

module.exports = () => (
  <div>
    I will try to duplicate this content:
    <SnippetSource code="bar">
      <p>...but this will throw an error because code attributes does not match!</p>
    </SnippetSource>
    here:
    <SnippetTarget code="foo" />
    <p>Remember, code attributes must match!</p>
  </div>
);

