global.rootRequire = function (name) {
    return require(__dirname + '/' + name);
};
var express = require("express"),
    app = express(),
    engines = require("consolidate"),
    bodyParser = require("body-parser"),
    multer = require('multer'),
    api = require("./routes/api.js")(app),
    index = require("./routes/index.js")(app),
    appRoot = __dirname;


app.use(multer({dest: './uploads'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(appRoot, '/public'));
app.use(express.static(appRoot, '/uploads'));
app.set("views", appRoot + '/public/views');
app.engine('html', engines.handlebars);
app.set('view engine', 'html');



app.listen(8080);