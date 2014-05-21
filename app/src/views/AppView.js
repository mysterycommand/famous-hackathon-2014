/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Modifier = require('famous/core/Modifier');
    var StateModifier = require('famous/modifiers/StateModifier');

    var ToneMatrixView = require('views/ToneMatrixView');
    var PlayheadView = require('views/PlayheadView');

    /*
     * @name AppView
     * @constructor
     * @description
     */

    function AppView() {
        View.apply(this, arguments);

        var main = new StateModifier({
            origin: [0.5, 0.5],
            size: [640, 640]
        });

        var matrixView = new ToneMatrixView();
        var playheadView = new PlayheadView();

        var t = Date.now();
        var d;
        var x = 0;
        var w = main.getSize()[1];
        var s = w / 16;
        var c = 0;

        var bpm = 120;
        var measure = ((60 * 1000) / bpm) * 16

        var playheadModifier = new Modifier({
            transform: function() {
                d = Date.now() - t;
                t = Date.now();

                x += (w / measure) * d;
                c = Math.floor((x / w) * s) * s - 4;
                if (c >= w - s) {
                    x = 0;
                    c = -4;
                }

                return Transform.translate(c, -4, 0);
            }
        });

        this.main = this.add(main);

        this.main.add(matrixView);
        this.main
            .add(playheadModifier)
            .add(playheadView);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
    };

    module.exports = AppView;
});
