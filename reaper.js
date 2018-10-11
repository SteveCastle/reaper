var flags = require('flags');
flags.defineString('name', 'Component', 'Your component name.');
flags.defineString('url', 'http://callsignmedia.com', 'The target url.');
flags.defineString('selector', '#target', 'The selector to target.');
flags.parse();
// Configure target url, selector, and output.
const SELECTOR = flags.get('selector');
const FILENAME = flags.get('name');
const URL = flags.get('url');

//Require Dependencies
var fs = require('fs');
var webdriverio = require('webdriverio');
var options = {
  desiredCapabilities: {
    browserName: 'firefox',
  },
};
var cssParse = require('css');
var HTMLtoJSX = require('htmltojsx');
var converter = new HTMLtoJSX({
  createClass: false,
});

const getHtml = () => {
  var results = {};

  var walkDOM = function(node, func) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      func(node);
    }
    node = node.firstChild;
    while (node) {
      walkDOM(node, func);
      node = node.nextSibling;
    }
  };

  function getCss(el) {
    var sheets = document.styleSheets,
      ret = [];
    el.matches =
      el.matches ||
      el.webkitMatchesSelector ||
      el.mozMatchesSelector ||
      el.msMatchesSelector ||
      el.oMatchesSelector;
    for (var i in sheets) {
      var rules = sheets[i].rules || sheets[i].cssRules;
      for (var r in rules) {
        if (el.matches(rules[r].selectorText)) {
          ret.push(rules[r].cssText);
        }
      }
    }
    return ret;
  }

  const el = document.getElementsByClassName(SELECTOR)[0];
  console.log(el);
  walkDOM(el, function(node) {
    console.log(node);
    if (node.className.length > 0) {
      results[node.className] = getCss(node);
    } else {
      results[node.tagName] = getCss(node);
    }
  });

  return {
    html: el.outerHTML,
    css: results,
  };
};

const getCssString = cssObject => {
  var css = '';
  for (var key in cssObject) {
    css = css.concat(`.${key} {`);
    for (var i = 0; i < cssObject[key].length; i++) {
      const rule = cssObject[key][i].substring(
        cssObject[key][i].indexOf('{') + 1,
        cssObject[key][i].length - 1,
      );
      if (cssObject[key].length != i) {
        css = css.concat(`${rule}\n`);
      } else {
        css = css.concat(`${rule}}\n`);
      }
    }
    css = css.concat(`}\n`);
  }
  return css;
};

const getHtmlString = html => {
  const jsx = converter.convert(html);
  const component = `import React from 'react';
import styles from './${FILENAME}.css';

const ${FILENAME} = ({}) => (
${jsx})

export default ${FILENAME};`;
  return component;
};

webdriverio
  .remote(options)
  .init()
  .url(URL)
  .execute(getHtml)
  .then(function(result) {
    fs.writeFile(
      `./output/${FILENAME}.js`,
      getHtmlString(result.value.html),
      function(err) {
        if (err) {
          return console.log(err);
        }
        console.log(`The file was saved!`);
      },
    );
    fs.writeFile(
      `./output/${FILENAME}.css`,
      getCssString(result.value.css),
      function(err) {
        if (err) {
          return console.log(err);
        }
        console.log(`The file was saved!`);
      },
    );
    console.log(JSON.stringify(result, null, 2));
  })
  .end();