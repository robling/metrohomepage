var swig = require('swig');
var path = require('path');
var hjson = require('hjson');
var fs = require('fs');
// Compile a file and store it, rendering it later
var tpl = swig.compileFile(path.join(__dirname , './view/tiles.tpl'));

module.exports = function (arg){
    "use strict";
    let source;
    if (!arg){
        source = hjson.parse(
            fs.readFileSync(
                path.resolve(__dirname, '../source.sample.json'), 'utf8'
                )
            );
    } else {
        source = arg;
    }
    return tpl(source);
}
