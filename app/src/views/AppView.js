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

        var main = new StateModifier({
            origin: [0.5, 0.5]
        });

        var bkgd = new Surface({
            properties: {
                backgroundColor: Random.hex()
            }
        });

        var bttn = new Surface({
            size: [100, 100],
            origin: [0.5, 0.5],
            align: [0.5, 0.5],
            properties: {
                backgroundColor: Random.hex(),
                boxShadow: '0 0 100px 10px rgba(0,0,0,0.25)',
                cursor: 'pointer'
            }
        });

        bttn.on('click', function() {
            bkgd.setProperties({ backgroundColor: Random.hex() });
            bttn.setProperties({ backgroundColor: Random.hex() });
        });

        this.main = this.add(main);
        this.main.add(bkgd);
        this.main.add(bttn);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
    };

    module.exports = AppView;
});
