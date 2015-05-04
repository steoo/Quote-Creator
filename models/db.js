module.exports = (function(){
    var mongoose = require("mongoose");

    mongoose.connect("mongodb://localhost/quotecreatornew");
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        console.log("Db ready to go!");
    });
    return db;

})()