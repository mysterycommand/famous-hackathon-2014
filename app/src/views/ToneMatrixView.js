/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    // var Transform = require('famous/core/Transform');
    // var StateModifier = require('famous/modifiers/StateModifier');
    var GridLayout = require('famous/views/GridLayout');

    var Random = require('math/Random');

    var ToneView = require('views/ToneView');

    /*
     * @name ToneMatrixView
     * @constructor
     * @description
     */

    function ToneMatrixView() {
        View.apply(this, arguments);

        var d = 16;
        var grid = new GridLayout({
            dimensions: [d, d]
        });

        var tones = [];
        grid.sequenceFrom(tones);

        for (var i = 0, len = d * d; i < len; ++i) {
            tones.push(new ToneView());
        }

        this.add(grid);
    }

    ToneMatrixView.prototype = Object.create(View.prototype);
    ToneMatrixView.prototype.constructor = ToneMatrixView;

    ToneMatrixView.DEFAULT_OPTIONS = {
    };

    module.exports = ToneMatrixView;
});
