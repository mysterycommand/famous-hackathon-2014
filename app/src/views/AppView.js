/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    // var Transform = require('famous/core/Transform');
    // var Modifier = require('famous/core/Modifier');
    var StateModifier = require('famous/modifiers/StateModifier');

    var Random = require('math/Random');

    /*
     * @name AppView
     * @constructor
     * @description
     */

    function AppView() {
        View.apply(this, arguments);

        var gain = new StateModifier({
            origin: [0.5, 0.5]
        });

        var main = new Surface({
            properties: {
                backgroundColor: Random.hex()
            }
        });

        var node = new Surface({
            size: [100, 100],
            origin: [0.5, 0.5],
            align: [0.5, 0.5],
            properties: {
                backgroundColor: Random.hex(),
                boxShadow: '0 0 30px 1px rgba(0,0,0,0.35)',
                cursor: 'pointer'
            }
        });

        node.on('click', function() {
            node.setProperties({
                backgroundColor: Random.hex()
            });
        });

        this.gain = this.add(gain);
        this.gain.add(main);
        this.gain.add(node);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
    };

    module.exports = AppView;
});
