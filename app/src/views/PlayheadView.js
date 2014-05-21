/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    // var Transform = require('famous/core/Transform');
    // var StateModifier = require('famous/modifiers/StateModifier');

    /*
     * @name PlayheadView
     * @constructor
     * @description
     */

    function PlayheadView() {
        View.apply(this, arguments);

        var line = new Surface({
            size: [40, undefined],
            properties: {
                backgroundColor: 'rgba(255,0,0,0.45)',
                boxShadow: '0 0 30px 3px rgba(0,0,0,0.65)',
                zIndex: 2
            }
        });

        this.add(line);
    }

    PlayheadView.prototype = Object.create(View.prototype);
    PlayheadView.prototype.constructor = PlayheadView;

    PlayheadView.DEFAULT_OPTIONS = {
    };

    module.exports = PlayheadView;
});
