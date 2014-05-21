/* globals define */
define(function(require, exports, module) {
    'use strict';

    var Engine = require('famous/core/Engine');
    var AppView = require('views/AppView');

    var ctx = Engine.createContext();
    ctx.setPerspective(1000);
    var app = new AppView();

    ctx.add(app);
});
