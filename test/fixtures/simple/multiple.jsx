/* eslint-disable no-unused-vars */
const React = require('react');

module.exports = () => (
  <div>
    I will simply duplicate this content:
    <SnippetSource code="snippetJSX">
      <section>
        <header>JSX is cool</header>
        <p>Let's try it!</p>
      </section>
    </SnippetSource>
    here:
    <SnippetTarget code="snippetJSX" />
    <p>and because it's really cool, I repeat:</p>
    <SnippetTarget code="snippetJSX" />
  </div>
);
