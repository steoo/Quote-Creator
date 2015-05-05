var app = require("./controllers.js"),
    $ = require("jQuery"),
    Backbone = require("Backbone"),
    quoteModel = require("./quoteModel.js");

    Backbone.$ = $;

module.exports = Backbone.View.extend({
    el: ".quote-standard",

    model: quoteModel,

    events : {
        "focus #quote-text, #quote-owner": "togglePlaceholder",
        "blur #quote-text, #quote-owner": "onBlur",
        "keyup #quote-text, #quote-owner": "onKeyUp"
    },

    initialize: function () {
        this.listenTo(this.model, "change:background_image", this.onChangeBackground)
        app.Channel.on("select:textcolor", this.onSelectColor, this);
    },

    onSelectColor: function (className) {
        this.$el.find("#quote-text").removeClass("white gray").addClass(className);
        this.$el.find("#quote-owner").removeClass("white gray").addClass(className);
    },
    onBlur: function (event) {
        this.togglePlaceholder(event);
        this.onKeyUp(event);
    },
    togglePlaceholder: function (event) {
        var type = event.type.toString().toLowerCase();
        var $target = $(event.target);
        var $parent = $target.parent();
        if ((type == "focusin" || type == "focus") && $target.hasClass("placeholder")) {
            $target.removeClass("placeholder");
        } else if ((type == "focusout" || type == "blur") && !$target.hasClass("placeholder") && $target.text().trim() === "") {
            $target.addClass("placeholder");
        }
    },
    onKeyUp: function(e){
        var id = $(e.target).attr("id")
        var text = $(e.target).text();
        var which = id === "quote-text" ? "quote_text" : "quote_owner";
        //app.timer.delay(self.model.set, [which, text], this.model);
        this.model.set(which, text);
    },

    onChangeBackground: function (model, src) {
        this.$el.css("background-image", "url("+src+")");
    }
})