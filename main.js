const express = require('express');
const app = express();
app.use('/', express.static(__dirname + '/public'));
const PORT = process.env.PORT || 3000;

app.listen(PORT);
