/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var Random = require('math/Random');
    var Tone = require('sound/Tone');

    var notesHash = {
        'C0': 16.35,
        'C#0': 17.32,
        'Db0': 17.32,
        'D0': 18.35,
        'D#0': 19.45,
        'Eb0': 19.45,
        'E0': 20.60,
        'F0': 21.83,
        'F#0': 23.12,
        'Gb0': 23.12,
        'G0': 24.50,
        'G#0': 25.96,
        'Ab0': 25.96,
        'A0': 27.50,
        'A#0': 29.14,
        'Bb0': 29.14,
        'B0': 30.87,
        'C1': 32.70,
        'C#1': 34.65,
        'Db1': 34.65,
        'D1': 36.71,
        'D#1': 38.89,
        'Eb1': 38.89,
        'E1': 41.20,
        'F1': 43.65,
        'F#1': 46.25,
        'Gb1': 46.25,
        'G1': 49.00,
        'G#1': 51.91,
        'Ab1': 51.91,
        'A1': 55.00,
        'A#1': 58.27,
        'Bb1': 58.27,
        'B1': 61.74,
        'C2': 65.41,
        'C#2': 69.30,
        'Db2': 69.30,
        'D2': 73.42,
        'D#2': 77.78,
        'Eb2': 77.78,
        'E2': 82.41,
        'F2': 87.31,
        'F#2': 92.50,
        'Gb2': 92.50,
        'G2': 98.00,
        'G#2': 103.83,
        'Ab2': 103.83,
        'A2': 110.00,
        'A#2': 116.54,
        'Bb2': 116.54,
        'B2': 123.47,
        'C3': 130.81,
        'C#3': 138.59,
        'Db3': 138.59,
        'D3': 146.83,
        'D#3': 155.56,
        'Eb3': 155.56,
        'E3': 164.81,
        'F3': 174.61,
        'F#3': 185.00,
        'Gb3': 185.00,
        'G3': 196.00,
        'G#3': 207.65,
        'Ab3': 207.65,
        'A3': 220.00,
        'A#3': 233.08,
        'Bb3': 233.08,
        'B3': 246.94,
        'C4': 261.63,
        'C#4': 277.18,
        'Db4': 277.18,
        'D4': 293.66,
        'D#4': 311.13,
        'Eb4': 311.13,
        'E4': 329.63,
        'F4': 349.23,
        'F#4': 369.99,
        'Gb4': 369.99,
        'G4': 392.00,
        'G#4': 415.30,
        'Ab4': 415.30,
        'A4': 440.00,
        'A#4': 466.16,
        'Bb4': 466.16,
        'B4': 493.88,
        'C5': 523.25,
        'C#5': 554.37,
        'Db5': 554.37,
        'D5': 587.33,
        'D#5': 622.25,
        'Eb5': 622.25,
        'E5': 659.26,
        'F5': 698.46,
        'F#5': 739.99,
        'Gb5': 739.99,
        'G5': 783.99,
        'G#5': 830.61,
        'Ab5': 830.61,
        'A5': 880.00,
        'A#5': 932.33,
        'Bb5': 932.33,
        'B5': 987.77,
        'C6': 1046.50,
        'C#6': 1108.73,
        'Db6': 1108.73,
        'D6': 1174.66,
        'D#6': 1244.51,
        'Eb6': 1244.51,
        'E6': 1318.51,
        'F6': 1396.91,
        'F#6': 1479.98,
        'Gb6': 1479.98,
        'G6': 1567.98,
        'G#6': 1661.22,
        'Ab6': 1661.22,
        'A6': 1760.00,
        'A#6': 1864.66,
        'Bb6': 1864.66,
        'B6': 1975.53,
        'C7': 2093.00,
        'C#7': 2217.46,
        'Db7': 2217.46,
        'D7': 2349.32,
        'D#7': 2489.02,
        'Eb7': 2489.02,
        'E7': 2637.02,
        'F7': 2793.83,
        'F#7': 2959.96,
        'Gb7': 2959.96,
        'G7': 3135.96,
        'G#7': 3322.44,
        'Ab7': 3322.44,
        'A7': 3520.00,
        'A#7': 3729.31,
        'Bb7': 3729.31,
        'B7': 3951.07,
        'C8': 4186.01
    };
    var notesKeys = Object.keys(notesHash);
    var waveForms = [
        'sine',
        'square',
        'sawtooth',
        'triangle'
    ];

    /*
     * @name ToneView
     * @constructor
     * @description
     */

    function ToneView() {
        View.apply(this, arguments);

        var bttn = this.bttn = new Surface({
            size: [32, 32],
            origin: [0.5, 0.5],
            align: [0.5, 0.5],
            properties: {
                cursor: 'pointer',
                zIndex: 1
            }
        });

        var context = this.options.context;
        var frequency = this.options.frequency;
        var type = this.options.type;
        var volume = this.options.volume;

        var tone = this.tone = new Tone({
            context: context,
            frequency: frequency,
            type: type,
            volume: volume
        });

        this.disable();
        bttn.on('click', this.toggle.bind(this));

        this.add(bttn);
    }

    ToneView.prototype = Object.create(View.prototype);
    ToneView.prototype.constructor = ToneView;

    ToneView.prototype.enable = function enable() {
        this.isEnabled = true;
        this.bttn.setProperties({
            backgroundColor: '#e7e7e7',
            border: '1px solid #fafafa',
            boxShadow: '0 0 10px 2px rgba(0,0,0,0.45)'
        });
    };

    ToneView.prototype.disable = function disable() {
        this.isEnabled = false;
        this.bttn.setProperties({
            backgroundColor: '#666',
            border: '1px solid #222',
            boxShadow: '0 0 10px 1px rgba(0,0,0,0.25)'
        });
    };

    ToneView.prototype.toggle = function toggle() {
        (this.isEnabled) ? this.disable() : this.enable();
    };

    ToneView.prototype.play = function play(duration) {
        var tone = this.tone;
        tone.start();

        setTimeout(function() { tone.stop(); }, duration);
    };

    ToneView.DEFAULT_OPTIONS = {
        context: new AudioContext(),
        frequency: notesHash[notesKeys[Random.integer(notesKeys.length)]],
        type: waveForms[Random.integer(waveForms.length)],
        volume: 0.5
    };

    module.exports = ToneView;
});
