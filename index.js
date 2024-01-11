const fs = require('fs');
const express = require('express')
const https = require('https');

const options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
};

https.createServer(options, app).listen(443, () => {
    console.log('load balancer has started')
})
