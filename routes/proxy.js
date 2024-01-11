const express = require('express');
const proxy = require('http-proxy-middleware');

const router = express.Router();

const servers = [
    {
        host: 'localhost',
        port: 3000,
        weight: 1
    }
];

const proxyOptions = {
    target: '',
    chooseOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
    },
    logLevel: 'debug',
}

let currIndex = 0;

const getServer = () => {
    currIndex = (currIndex + 1) % servers.length;
}

router.all('*', (req, res) => {
    const target = getServer();

    proxyOptions.target = `http://${target.host}:${target.port}`;
    proxy(proxyOptions)(req, res);
});

module.exports = router;
