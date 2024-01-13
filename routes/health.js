const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/health', (req, res) => {
    const results = [];

    for (let i = 0; i < servers.length; i++) {
        const server = servers[i];

        try {
            const response = await axios.get(`http://${server.host}:${server.port}/app/healthcheck`)
            if (response.status === 200) {
                results.push({
                    server: server.id,
                    status: 'OK'
                });
            } else {
                results.push({
                    server: server.id,
                    status: 'FAIL'
                });
            }
        } catch (e) {
            results.push({
                server: server.id,
                status: 'FAIL'
            });
        }
    }
    res.json(results);
})

module.exports = router;
