/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Modifier = require('famous/core/Modifier');

    var Random = require('math/Random');

    /*
     * @name AppView
     * @constructor
     * @description
     */

    function AppView() {
        View.apply(this, arguments);

        var logo = new Surface({
            size: [200, 200],
            classes: ['backfaceVisibility'],
            properties: {
                backgroundColor: Random.hex()
            }
        });

        var initialTime = Date.now();
        var centerSpinModifier = new Modifier({
            origin: [0.5, 0.5],
            transform : function() {
                return Transform.rotateY(.002 * (Date.now() - initialTime));
            }
        });

        this.add(centerSpinModifier).add(logo);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
    };

    module.exports = AppView;
});
