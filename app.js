var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'view')));

app.listen(process.env.PORT || 5000, '0.0.0.0', function() {});
console.log("server listeining on port 5000")
module.exports = app;