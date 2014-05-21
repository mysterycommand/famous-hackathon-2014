/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    /*
     * @name ToneView
     * @constructor
     * @description
     */

    function ToneView() {
        View.apply(this, arguments);
    }

    ToneView.prototype = Object.create(View.prototype);
    ToneView.prototype.constructor = ToneView;

    ToneView.DEFAULT_OPTIONS = {
    };

    module.exports = ToneView;
});
