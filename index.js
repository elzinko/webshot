#!/usr/bin/env node

'use strict';

const express = require('express');

const { getScreenshot } = require('./lib/webshot');

const port = process.env.PORT_WEBSHOT || 3000;

const app = express();
app.disable('x-powered-by');
app.get('/api/*', getScreenshot);
app.listen(port, () => console.log(`Server listens on http://localhost:${port}`));
