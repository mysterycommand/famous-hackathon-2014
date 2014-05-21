/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');

    var Random = require('math/Random');
    var AppView = require('views/AppView');

    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    var app = new AppView();

    mainContext.add(app);
});
