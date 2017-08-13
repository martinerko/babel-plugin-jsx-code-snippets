/* eslint-disable no-unused-vars */
const React = require('react');

module.exports = () => (
  <div>
    <SnippetTarget code="snippet1" />
    I will simply duplicate this content:
    <SnippetSource code="snippet1">
      <section className="headline">
        <header>JSX is cool</header>
        <p>Let's try it!</p>
      </section>
      <section className="headline">
        <header>JSX is cool</header>
        <p>Let's try it!</p>
      </section>
    </SnippetSource>
    here:
    <p>Because JSX is simply cool!</p>
  </div>
);
