/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    // var Transform = require('famous/core/Transform');
    // var StateModifier = require('famous/modifiers/StateModifier');
    var GridLayout = require('famous/views/GridLayout');

    var Random = require('math/Random');

    var ToneView = require('views/ToneView');
    var waveForms = [
        'sine',
        'square',
        'sawtooth',
        'triangle'
    ];

    /*
     * @name ToneMatrixView
     * @constructor
     * @description
     */

    function ToneMatrixView() {
        View.apply(this, arguments);

        var d = this.d = 16;
        var hd = d / 2;
        var grid = new GridLayout({
            dimensions: [d, d]
        });

        var tones = this.tones = [];
        grid.sequenceFrom(tones);

        var context = new AudioContext();

        for (var i = 0, cols = d; i < cols; ++i) {
            for (var j = 0, rows = d; j < rows; ++j) {
                tones.push(new ToneView({
                    context: context,
                    frequency: 196 * (rows - i),
                    type: waveForms[Random.integer(waveForms.length)],
                    volume: (i + rows / 2) / rows
                }));
            }
        }

        if (Random.bool()) {
            for (var k = 0, len = d; k < len; ++k) {
                tones[k + k * d].enable();
            }
        } else {
            for (var k = 0, len = d; k < len; ++k) {
                if (Random.bool()) { tones[k + Random.integer(hd) * hd].toggle(); }
                if (Random.bool()) { tones[k + Random.integer(hd, d) * (d - 1)].toggle(); }
            }
        }

        this.add(grid);
    }

    ToneMatrixView.prototype = Object.create(View.prototype);
    ToneMatrixView.prototype.constructor = ToneMatrixView;

    ToneMatrixView.prototype.playColumn = function playColumn(col, duration) {
        for (var i = col, len = this.tones.length; i < len; i += this.d) {
            var toneView = this.tones[i];
            if (toneView.isEnabled) {
                toneView.play(duration);
            }
        }
    };

    ToneMatrixView.DEFAULT_OPTIONS = {
    };

    module.exports = ToneMatrixView;
});
