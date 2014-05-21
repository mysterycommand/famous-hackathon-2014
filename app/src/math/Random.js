define(function(require, exports, module) {
    var Random = require('famous/math/Random');

    /**
     * Return random hexidecimal color value.
     *
     * @method hex
     *
     * @param {String} prefix The prefix to use on the generated six character string, default '#'.
     * @return {String} A random hexidecimal color in the form of '#024ace'.
     */
    Random.hex = function hex(prefix) {
        prefix || (prefix = '#');
        return prefix + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
    };

    module.exports = Random;
});