const express = require('express');
const path = require('path');

const app = express();
app.use('/styles', express.static('styles'));
app.use('/scripts', express.static('scripts'));
app.use('/public', express.static('public'));
app.use('/statics', express.static('statics'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.listen(4000, () => {
    console.log('Node basic server at 4000 port ...')
});
