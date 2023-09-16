const express = require('express');

const { getScreenshot } = require('./lib/webshot');

const port = process.env.PORT_WEBSHOT || 3000;

const app = express();
app.disable('x-powered-by');
// app.get('/', (req, res) => res.send('Webshot is alive !'));
app.get('/*', getScreenshot);
app.listen(port, () => console.log(`Webshot listens on http://localhost:${port}`));

module.exports = app;
