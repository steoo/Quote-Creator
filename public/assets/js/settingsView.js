module.exports = function () {
    var app = require("./controllers.js"),
        $ = require("jQuery"),
        Backbone = require("Backbone"),
        owlCarousel = require("../../vendor/owl-carousel/owl.carousel.js");

    return Backbone.View({
        el: ".settings",

        events: {
            "click .carousel-img": "setBackground",
            "click .palette div": "setTextColor"
        },

        options: {
            singleItem: true,
            pagination: false,
            navigation : true,
            mouseDrag: false
        },

        initialize: function () {
            this.initCarousel();
        },

        initCarousel : function () {
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
}