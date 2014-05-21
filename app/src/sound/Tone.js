define(function(require, exports, module) {

    var Tone = function Tone(opts) {
        this.context = opts.context;
        this.frequency = opts.frequency;
        this.type = opts.type;
        this.volume = opts.volume;

        this.oscillator = null;
        this.gain = null;
    };

    Tone.prototype = Object.create(Object.prototype);
    Tone.prototype.constructor = Tone;

    Tone.prototype.start = function start(delay) {
        delay || (delay = 0);
        if (this.oscillator) { this.stop(); }

        _create.call(this);
        _start.call(this, delay);
        _connect.call(this);
    }

    Tone.prototype.stop = function stop(delay) {
        delay || (delay = 0);

        _stop.call(this, delay);
        _destroy.call(this);
    }

    function _create() {
        this.oscillator = this.context.createOscillator();
        this.gain = this.context.createGain();
    }

    function _start(delay) {
        this.oscillator.frequency.value = this.frequency;
        this.oscillator.type = this.type;
        this.oscillator.start(delay);
        this.gain.gain.value = this.volume;
    }

    function _connect() {
        this.oscillator.connect(this.gain);
        this.gain.connect(this.context.destination);
    }

    function _stop(delay) {
        if ( ! this.oscillator) { return; }

        this.oscillator.stop(delay);
        this.gain.gain.value = 0;
    }

    function _destroy() {
        this.oscillator = null;
        this.gain = null;
    }

    module.exports = Tone;
});