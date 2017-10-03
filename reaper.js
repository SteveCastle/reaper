var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};




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

    const el = document.getElementsByClassName('_8a10v')[0];
    const css = getStylesWithoutInherited(el);
    return {
        html: el.outerHTML,
        css
    };
}

webdriverio
    .remote(options)
    .init()
    .url('http://www.instagram.com')
    .execute(getHtml).then(function(result) {
        console.log(JSON.stringify(result, null, 2));
    })
    .end();