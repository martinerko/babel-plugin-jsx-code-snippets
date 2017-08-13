/* eslint-disable no-unused-vars */
const React = require('react');

module.exports = () => (
  <div>
    I will simply duplicate this content:
    <SnippetSource code="snippet1">
      <section>
        <header>JSX is cool</header>
        <p>Let's try it!</p>
      </section>
    </SnippetSource>
    here:
    <SnippetTarget code="snippet1" />
    <p>Because JSX is simply cool!</p>
  </div>
);
