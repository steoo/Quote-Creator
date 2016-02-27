var $ = require("jQuery"),
    _ = require("underscore"),
    Backbone = require("Backbone"),
    quoteModel = require("./quoteModel.js"),
    quoteView = require("./quoteView.js"),
    settingsView = require("./settingsView.js"),
    CanvasTextWrapper = require("CanvasTextWrapper");

Backbone.$ = $;

module.exports = Backbone.View.extend({

    el: "body",

    eventEmitter: _.extend({}, Backbone.Events),

    initialize: function () {
        _.bindAll(this, "drawCanvas");
        this.quoteView = new quoteView({model: new quoteModel});
        this.settings = new settingsView();
        this.settings.initCarousel();
    },

    events: {
        "click .create": "drawCanvas"
    },

    drawCanvas: function () {
        var that = this,
            ctx = this.$el.find("canvas")[0].getContext("2d"),
            brandLogo = new Image(64,64),
            img = new Image(600, 600),
            text = this.quoteView.$el.find("#quote-text").text().trim(),
            author = this.quoteView.$el.find("#quote-owner").text().trim();
        if(!text){
            alert("Text missing");
            return false;
        }
        if(!author){
            alert("Author missing");
            return false;
        }
        img.src = this.quoteView.model.get("background_image");

        if(!img.src){
            alert("There is no background");
            return false;
        }

        var options = {
            "font": 'italic 500 36px Cabin',
            "textAlign": "center",
            "lineHeight": "40px",
            "verticalAlign": "middle",
            "paddingX": 100,
            "paddingY": 80
        };

        var options_author = {
            "font": 'italic 500 30px Cabin',
            "textAlign": "right",
            "lineHeight": "40px",
            "verticalAlign": "bottom",
            "paddingX": 50,
            "paddingY": 80
        };
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 2;
        ctx.shadowColor = "#333333";
        ctx.fillStyle = "#ffffff";

        brandLogo.onload = function () {
            var dim = 64;
            ctx.drawImage(brandLogo, 300-32, 60, dim, dim);
        };

        img.onload = function () {
            var dim = 600;
            ctx.drawImage(img, 0, 0, dim, dim);
            brandLogo.src = that.quoteView.model.get("brand_logo");
            new CanvasTextWrapper(that.$el.find("canvas")[0], text, options);
            new CanvasTextWrapper(that.$el.find("canvas")[0], author, options_author);
            drawRect();
            that.eventEmitter.trigger("save", "save:canvas");
        };

        function drawRect(){
            ctx.rect(30, 30, 540, 540);
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.lineWidth = "4";
            ctx.strokeStyle = "lightgray";
            ctx.stroke();
        }
    }

});

