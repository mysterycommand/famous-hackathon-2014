/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Modifier = require('famous/core/Modifier');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transitionable = require('famous/transitions/Transitionable');
    var SnapTransition = require('famous/transitions/SnapTransition')

    var Random = require('math/Random');
    var Tone = require('sound/Tone');

    /*
     * @name ToneView
     * @constructor
     * @description
     */

    function ToneView() {
        View.apply(this, arguments);

        var bttn = this.bttn = new Surface({
            size: [32, 32],
            align: [0.5, 0.5],
            properties: {
                cursor: 'pointer'
            }
        });

        Transitionable.registerMethod('snap', SnapTransition);
        this.translateZ = new Transitionable(1);

        var modifier = this.modifier = new Modifier({
            origin: [0.5, 0.5],
            transform: function() {
                return Transform.translate(0, 0, this.translateZ.get());
            }.bind(this)
        });

        // this.zPosition = new Transitionable(1);

        var context = this.options.context;
        var compressor = this.options.compressor;
        var frequency = this.options.frequency;
        var type = this.options.type;
        var volume = this.options.volume;

        var tone = this.tone = new Tone({
            context: context,
            compressor: compressor,
            frequency: frequency,
            type: type,
            volume: volume
        });

        this.disable();
        bttn.on('click', this.toggle.bind(this));
        // bttn.on('mousedown', this.tone.start.bind(this.tone));
        // bttn.on('mouseup', this.tone.stop.bind(this.tone));

        this.add(modifier).add(bttn);
    }

    ToneView.prototype = Object.create(View.prototype);
    ToneView.prototype.constructor = ToneView;

    ToneView.prototype.enable = function enable() {
        this.isEnabled = true;
        this.bttn.setProperties({
            backgroundColor: '#e7e7e7', // Random.hex(),
            border: '1px solid #fafafa',
            boxShadow: '0 0 10px 2px rgba(0,0,0,0.45)',
            zIndex: 5
        });
    };

    ToneView.prototype.disable = function disable() {
        this.isEnabled = false;
        this.bttn.setProperties({
            backgroundColor: '#666',
            border: '1px solid #222',
            boxShadow: '0 0 10px 1px rgba(0,0,0,0.25)',
            zIndex: 1
        });
    };

    ToneView.prototype.toggle = function toggle() {
        (this.isEnabled) ? this.disable() : this.enable();
    };

    ToneView.prototype.play = function play(duration) {
        var tone = this.tone;
        tone.start();

        setTimeout(function() { tone.stop(); }, duration);

        // this.modifier.setTransform(Transform.translate(0, 0, 100), {
        //     method: 'snap',
        //     period: 200,
        //     dampingRatio: 0.2,
        //     velocity: 0
        // });

        // this.zPosition.set(100, {
        //     method: 'snap',
        //     period: 200,
        //     dampingRatio: 0.2,
        //     velocity: 0
        // }, function() { this.zPosition.set(1, {}) }.bind(this));

        var transition = {
            method: 'snap'
        };

        this.translateZ.set(50, transition, function() {
            this.translateZ.set(1, transition);
        }.bind(this));
    };

    ToneView.DEFAULT_OPTIONS = {
        context: new AudioContext(),
        // frequency: notesHash[notesKeys[Random.integer(notesKeys.length)]],
        // type: waveForms[Random.integer(waveForms.length)],
        volume: 0.5
    };

    module.exports = ToneView;
});
