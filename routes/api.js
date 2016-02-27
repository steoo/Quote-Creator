module.exports = function (app) {
    var model = rootRequire("models/quote.js");

    app.post("/save", function (req, res) {
        var params = req.body,
            files = req.files;
        console.log(files);
        /*model.saveQuote(params, function (quote) {
            console.log("Saving quote", quote);
            res.json(quote);
        })*/
    })
};