module.exports = (function () {
    var _ = require("underscore"),
        Backbone = require("Backbone");

    return {
        Channel: _.extend({}, Backbone.Events)
    }
})()