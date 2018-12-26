const express = require('express');
const app = express();
const opn = require('opn');
const port = process.env.port || 8094;

const user = require('./routers/user');

const baseUrl = "/api/v1";

app.use(baseUrl + '/user', user);

app.listen(port, () => {
    // opn(`http://localhost:${port}`);
});