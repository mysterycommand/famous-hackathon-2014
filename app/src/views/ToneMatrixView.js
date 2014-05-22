/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    // var Surface = require('famous/core/Surface');
    // var Transform = require('famous/core/Transform');
    // var StateModifier = require('famous/modifiers/StateModifier');
    var GridLayout = require('famous/views/GridLayout');

    var Random = require('math/Random');

    var ToneView = require('views/ToneView');

    var AudioContext = window.AudioContext || window.webkitAudioContext;

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
        var masterGain = context.createGain();
        var compressor = context.createDynamicsCompressor();

        masterGain.gain.value = 0.75;
        masterGain.connect(compressor);
        compressor.connect(context.destination);

        var type = waveForms[Random.integer(0, waveForms.length - 1)];
        // var notes = [1,3,4,5,7,8,10,11,12,14,15,17,18,19,21,22];

        for (var i = 0, cols = d; i < cols; ++i)
            for (var j = 0, rows = d; j < rows; ++j) {
                var note = (rows - i); // notes[rows - 1 - i];
                var frequency = 440 * Math.pow(2, (note + 59) / 12 - 6);
                // console.log(i, note, frequency);

                tones.push(new ToneView({
                    context: context,
                    compressor: masterGain,
                    frequency: frequency,
                    type: type,
                    volume: 0.5
                }));
            }

        for (var k = 0, len = d; k < len; ++k) {
            if (Random.bool()) tones[k + Random.integer(hd) * hd].toggle();
            if (Random.bool()) tones[k + Random.integer(hd, d) * (d - 1)].toggle();
        }

        this.add(grid);
    }

    ToneMatrixView.prototype = Object.create(View.prototype);
    ToneMatrixView.prototype.constructor = ToneMatrixView;

    ToneMatrixView.prototype.playColumn = function playColumn(col, duration) {
        if (this.col === col) return;
        this.col = col;

        for (var i = col, len = this.tones.length; i < len; i += this.d) {
            var toneView = this.tones[i];
            if (toneView.isEnabled) toneView.play(duration);
        }
    };

    ToneMatrixView.DEFAULT_OPTIONS = {
    };

    module.exports = ToneMatrixView;
});
