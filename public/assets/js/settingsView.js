var app = require("./controllers.js"),
    $ = require("jQuery"),
    Backbone = require("Backbone"),
    owlCarousel = require("owlCarousel");

    Backbone.$ = $;
    $.fn.owlCarousel = owlCarousel;
module.exports = Backbone.View.extend({
    el: ".settings",

    events: {
        "click .carousel-img": "setBackground",
        "click .palette div": "setTextColor"
    },

    options: {
        singleItem: true,
        pagination: false,
        navigation: true,
        mouseDrag: false
    },

    initialize: function () {
        //this.initCarousel();
    },

    initCarousel: function () {
        this.owlCarousel = this.$el.find(".carousel").owlCarousel(this.options);
    },

    setBackground: function (e) {
        var $target = $(e.target),
            src = $target.attr("src");

        app.Channel.trigger("select:background", src);
    },

    setTextColor: function (e) {
        var $target = $(e.target),
            className = $target.attr("class");

        app.Channel.trigger("select:textcolor", className);
    }

})
