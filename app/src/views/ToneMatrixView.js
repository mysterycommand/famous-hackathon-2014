/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    /*
     * @name ToneMatrixView
     * @constructor
     * @description
     */

    function ToneMatrixView() {
        View.apply(this, arguments);
    }

    ToneMatrixView.prototype = Object.create(View.prototype);
    ToneMatrixView.prototype.constructor = ToneMatrixView;

    ToneMatrixView.DEFAULT_OPTIONS = {
    };

    module.exports = ToneMatrixView;
});
