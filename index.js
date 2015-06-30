exports.sync = function (){
    'use strict';
    return "Hello World";
};

exports.generate = function *(){
    'use strict';
    return require('./lib/render.js')();
};
