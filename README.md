# JSX Code Snippets


*JSX-Code-Snippets* is a Babel plugin that allows you to "duplicate" code snippets in your source code.
It does by cloning content of wrapped element.

*JSX-Code-Snippets* relies upon only one dependency which is *Babel*. It is compatible with React and React Native.

## Installation
As a prerequisite, you need to have [Babel](https://github.com/babel/babel) installed and configured in your project.

Install via npm:

```
  npm install --save-dev babel-plugin-jsx-code-snippets
```

Then you only need to specify *JSX-Code-Snippets* as Babel plugin, which you would typically do in your `.babelrc`.
```
{
  ...
  "plugins": ["jsx-code-snippets"]
}
```


## Syntax
### SnippetSource tag

The SnippetSource is used to wrap a JSX or HTML element that you want to use as a snippet later on in your code. In other words, it's a "copy" command.

```html
<SnippetSource code="snippet1">
  <section>
    <header>JSX is cool</header>
    <p>Let's try it!</p>
  </section>
</SnippetSource>
```

Each SnippetSource tag must have `code` attribute specified. It must contain exactly one direct child element.
The content of SnippetSource tag will be processed and rendered the same way as any other JSX or HTML.
You can use multiple SnippetSource tags simultaneously.


```html
<div>
  My React app.
  <SnippetSource code="snippet1">
    <section>
      <header>JSX is cool</header>
      <p>Let's try it!</p>
    </section>
  </SnippetSource>
  <p>
    Some fancy words here
  </p>
  <SnippetSource code="snippet2">
    <p>And other words here</p>
  </SnippetSource>
</div>
```

**Transformation**

SnippetSource tag will be simply replaced by it's content.

Before transformation:
```html
<SnippetSource code="snippet1">
  <section>
    <header>JSX is cool</header>
    <p>Let's try it!</p>
  </section>
</SnippetSource>
```

After transformation:
```html
<section>
  <header>JSX is cool</header>
  <p>Let's try it!</p>
</section>
```



### SnippetTarget tag

The SnippetTarget is used as a target element into which the source will be copied.
In other words, it's a "paste" command.
Each SnippetTarget tag must have `code` attribute specified. This attribute must match with SnippetSource tag.

```html
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
```

You can use multiple SnippetTarget tags simultaneously.

```html
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
  and second time here:
  <SnippetTarget code="snippet1" />
  <p>Because JSX is simply cool!</p>
</div>
```

**Transformation**

The SnippetTarget tag will be replaced by the content of SnippetSource tag referred by same `code` attribute.

Before transformation:
```html
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
  and second time here:
  <SnippetTarget code="snippet1" />
  <p>Because JSX is simply cool!</p>
</div>
```

After transformation:
```html
<div>
  I will simply duplicate this content:
  <section>
    <header>JSX is cool</header>
    <p>Let's try it!</p>
  </section>
  here:
  <section>
    <header>JSX is cool</header>
    <p>Let's try it!</p>
  </section>
  and second time here:
  <section>
    <header>JSX is cool</header>
    <p>Let's try it!</p>
  </section>
  <p>Because JSX is simply cool!</p>
</div>
```

## Background story
The main reason behind this plugin is an ability to simply show the important snippets of the code to the user.
This plugin in combination with [*jsx-to-string*](https://www.npmjs.com/package/jsx-to-string) allows you to maintain your code samples much easier. You don't need to copy your markup into another place because
*JSX-Code-Snippets* will do this job for you automatically!

Full example:
```javascript
import React, { Component } from "react";
import { TabContainer, Tab } from "my-library";
import jsxToString from "jsx-to-string";

export default () => {
  return (
    <div>
      TabContainer component:
      <SnippetSource code="example">
        <TabContainer>
          <Tab title="Tab 1">
            <header>ES6 is cool</header>
            <p>Yeah!</p>
          </Tab>
          <Tab title="Tab 2">
            <header>JSX is cool</header>
            <p>Yeah!</p>
          </Tab>
        </TabContainer>
      </SnippetSource>
      <br />
      Your code:
      <pre>
        <code>
          {jsxToString(<SnippetTarget code="example" />)}
        </code>
      </pre>
    </div>
  );
}
```
