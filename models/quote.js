module.exports = (function () {
    var db = require("./db.js"),
        mongoose = require("mongoose"),
        shortId = require("shortid"),
        Schema = mongoose.Schema;


    var quoteSchema = new Schema({
        "id": String, //Random Identifier
        "quote_text": String,  // Testo della citazione, salvo per ricerca
        "quote_owner": String, // Autore della citazione, salvo per ricerca
        "brand_logo": String, // Di default quello di Intertwine, creo per flessibilità futura
        "background_image": String, // Riferimento dell'immagine di background, salvo perché non si sà mai
        "src": String, // Reale immagine della citazione,
        "color": String //colore delle stringhe
    })

    var Quote = mongoose.model('Quote', quoteSchema);

    return {
        getQuote: function getQuote(id, callback){
            return Quote.findOne({"id": id}, function(err, Quote){
                if(err) return console.error(err);
                if(Quote) return callback && callback.call(this, Quote);
                else return "No Quote Matched";
            })
        },

        getQuotes: function getQuotes(callback){
            return Quote.find(function(err, Quotes){
                if(err) return console.error(err);
                return callback && callback.call(this, quotes);
            })
        },

        saveQuote: function (data, callback) {
            var id = shortId.generate();
            return Quote.findOne({"id": id}, function(err, quote){
                if(err)
                    return console.error(err);
                if(!quote){
                    data["id"] = id;
                    return new Quote(data).save(function(err, quote){
                        if(err) return console.error(err);
                        return callback && callback.call(this, quote);
                    })
                } else {
                    return saveQuote(data, callback);
                }
            })
        },

        uploadImage: function () {

        }

    }

})()