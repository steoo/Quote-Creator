var app = require("./controllers.js"),
    Backbone = require("Backbone");

module.exports = Backbone.Model.extend({

    url: "/save",

    defaults: {
        "id": "", //Random Identifier
        "quote_text": "",  // Testo della citazione, salvo per ricerca
        "quote_owner": "", // Autore della citazione, salvo per ricerca
        "brand_logo": "/public/assets/img/logo64x64.jpg", // Di default quello di Intertwine, creo per flessibilità futura
        "background_image": "", // Riferimento dell'immagine di background, salvo perché non si sà mai
        "src": "", // Reale immagine della citazione,
        "color": ""
    },

    initialize: function () {
        app.Channel.on("select:background", this.onSelectBackground, this);
    },

    onSelectBackground: function (src) {
        if(src){
            this.set("background_image", src);
        }
    }
    
})