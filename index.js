const express = require('express');

const { getScreenshot } = require('./lib/webshot');


let dotenv = require('dotenv').config()
console.log(dotenv);

const port = process.env.PORT_WEBSHOT || 3000;

const app = express();
app.disable('x-powered-by');
app.get('/', (req, res) => res.send('Webshot is alive !'));
app.get('/api/*', getScreenshot);
app.listen(port, () => console.log(`Webshot listens on http://localhost:${port}`));

module.exports = app;
