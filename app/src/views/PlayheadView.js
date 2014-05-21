/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    /*
     * @name PlayheadView
     * @constructor
     * @description
     */

    function PlayheadView() {
        View.apply(this, arguments);
    }

    PlayheadView.prototype = Object.create(View.prototype);
    PlayheadView.prototype.constructor = PlayheadView;

    PlayheadView.DEFAULT_OPTIONS = {
    };

    module.exports = PlayheadView;
});
