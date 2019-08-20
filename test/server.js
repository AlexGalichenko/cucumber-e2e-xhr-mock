const express = require('express');
const app = express();

app.use(express.static(__dirname + "/page"));

app.get("/time", function (req, res) {
    res.send(new Date());
});

// app.listen(3000, function () {});
module.exports = app;
