///////////////////////////////////////////////////////////////////
//  Author: Jared Beach
//  Title: Tumblr Slide Show
//  Description: Node.js app for pomodoro timing
//////////////////////////////////////////////////////////////////

//#region GLOBAL_VARIABLES
var port = process.env.PORT || 2015

var express = require("express"),
    app = express();
app.all('*', function (req, res, next) {
    app.use(express.static(__dirname + '/public'));
    next();
});
var server = app.listen(port, function () {
    console.log('Listening on port %d', server.address().port);
});

app.get('/', function (req, res) {
    console.log("user started app");
    res.sendFile(__dirname + "/public/index.html");
})