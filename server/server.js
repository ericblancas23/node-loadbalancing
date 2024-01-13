const express = require('express');
const app = express();

app.get('/app', (req, res) => {
    res.send(`Hello World!, host: ${process.env.HOSTNAME}`)
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})
