var fs = require('fs');
var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};

var HTMLtoJSX = require('htmltojsx');
var converter = new HTMLtoJSX({
  createClass: true,
  outputClassName: 'AwesomeComponent'
});


const getHtml = () => {
        // Works in Firefox only
        function getStylesWithoutInherited(el) {
          return diffObjs(
            computedStylesToObj(window.getComputedStyle(el)),
            // window.getDefaultComputedStyle works in Firefox only
            computedStylesToObj(window.getDefaultComputedStyle(el))
          );
        }

        function diffObjs(obj1, obj2) {
          var diffObj = {};
          for (var prop in obj1) {
            if (obj1.hasOwnProperty(prop)) {
              if (obj1[prop] !== obj2[prop]) {
                diffObj[prop] = obj1[prop];
              }
            }
          }
          return diffObj;
        }

        function computedStylesToObj(cs) {
          var len = cs.length;
          var obj = {};
          for (var i=0; i<len; i++) {
            var style = cs[i];
            obj[style] = cs.getPropertyValue(style);
          }
          return obj;
        }

    const el = document.getElementsByClassName('row')[5];
    const css = getStylesWithoutInherited(el);
    return {
        html: el.outerHTML,
        css
    };
}

webdriverio
    .remote(options)
    .init()
    .url('https://mdbootstrap.com/sections/testimonials-sections/')
    .execute(getHtml).then(function(result) {
        result.value.html = converter.convert(result.value.html);
        fs.writeFile("./output.js", result.value.html, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
        fs.writeFile("./output.css", JSON.stringify(result.value.css,null, 2), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
        console.log(JSON.stringify(result, null, 2));
    })
    .end();