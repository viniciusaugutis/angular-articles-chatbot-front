var compression = require('compression');
const express = require('express');

const app = express();

app.use(express.static(__dirname + '/dist'));

app.use(compression());
app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(process.env.PORT || 3000, function () {
  console.log("up and running on port " + process.env.PORT);
});

