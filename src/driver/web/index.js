const express = require('express')
const bodyParser = require('body-parser');

const webapp = require('./app');
const api = require('./api');

module.exports = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}));
    
    webapp(app);
    api(app);

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => console.log("Bonus site listenning at port " + PORT));
}
