
const express = require('express');
const app = express();
const PORT = 80;

app.use(express.static('src/public'));

app.get('/sayhello', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
