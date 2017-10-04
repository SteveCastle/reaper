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

var results = {};

//declaration before
var walkDOM = function (node,func) {
    if(node.nodeType === Node.ELEMENT_NODE){
        func(node);
    }
        node = node.firstChild;
        while(node) {
            walkDOM(node,func);
            node = node.nextSibling;
        }
};    

        function getCss(el) {
            var sheets = document.styleSheets, ret = [];
            el.matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector 
                || el.msMatchesSelector || el.oMatchesSelector;
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

    const el = document.getElementsByClassName('row')[5];

walkDOM(el, function(node) {
    console.log(node);
    results[node.className] = (getCss(node));
});

    return {
        html: el.outerHTML,
        css: results
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