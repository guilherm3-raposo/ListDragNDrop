const colors = require('colors');
const express = require('express');
const path = require('path');
const PORT = 5000;

let app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname.split('server')[0]}src/templates/index.html`));
});

app.get('/node_modules/*', (req, res) => {
    res.sendFile(path.join(`${__dirname.split('server')[0]}/${req.url}`));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname.split('server')[0]}src/${req.url}`));
});

app.listen(PORT);

console.log('\nServed at: ', `http://localhost:${PORT}`.italic.yellow.underline);