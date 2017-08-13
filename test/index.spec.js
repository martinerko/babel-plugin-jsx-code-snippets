const { assert, expect } = require('chai');
const { render } = require('./utils');
const { SOURCE_TAG, TARGET_TAG } = require('../src/constants');
const plugin = require('../src');

require('babel-core/register')({
  presets: ['babel-preset-react'],
  plugins: [plugin],
  cache: false
});

describe('using one snippet pair', () => {
  const Fixture = require('./fixtures/simple/single.jsx');
  const renderedContent = render(Fixture);
  it('should render two html section elements', () => {
    assert(renderedContent.match(/<section[^>]*>/).length, 2);
  });

  it('should not loose class attribute', () => {
    assert(renderedContent.match(/class="headline"/).length, 1);
  });

  it(`should not render any ${SOURCE_TAG} tag`, () => {
    expect(renderedContent).not.to.contain(SOURCE_TAG);
  });

  it(`should not render any ${TARGET_TAG} tag`, () => {
    expect(renderedContent).not.to.contain(TARGET_TAG);
  });

  it(`should replace ${SOURCE_TAG} and ${TARGET_TAG} tag with divs`, () => {
    assert(renderedContent.match(/<div data-snippet-code="snippet1"/).length, 2);
  });
});

describe(`using one ${SOURCE_TAG} tag and two ${TARGET_TAG} tags`, () => {
  const Fixture = require('./fixtures/simple/multiple.jsx');
  const renderedContent = render(Fixture);

  it('should render three html section elements', () => {
    assert(renderedContent.match(/<section[^>]*>/).length, 3);
  });

  it(`should not render any ${SOURCE_TAG} tag`, () => {
    expect(renderedContent).not.to.contain(SOURCE_TAG);
  });

  it(`should not render any ${TARGET_TAG} tag`, () => {
    expect(renderedContent).not.to.contain(TARGET_TAG);
  });
});

describe(`using multiple ${SOURCE_TAG} tags and multiple ${TARGET_TAG} tags`, () => {
  const Fixture = require('./fixtures/complex/multiple.jsx');
  const renderedContent = render(Fixture);

  it('should render four html section elements', () => {
    assert(renderedContent.match(/<section[^>]*>/).length, 3);
  });

  it(`should not render any ${SOURCE_TAG} tag`, () => {
    expect(renderedContent).not.to.contain(SOURCE_TAG);
  });

  it(`should not render any ${TARGET_TAG} tag`, () => {
    expect(renderedContent).not.to.contain(TARGET_TAG);
  });
});

describe('when encountering errors', () => {
  it('should fail for missing "code" attribute', () => {
    expect(() => {
      require('./fixtures/errors/missingCode.jsx');
    }).to.throw(Error);
  });

  it(`should fail when "code" attribute of ${SOURCE_TAG} and ${TARGET_TAG} is different`, () => {
    expect(() => {
      require('./fixtures/errors/differentCodes.jsx');
    }).to.throw(Error);
  });
});
