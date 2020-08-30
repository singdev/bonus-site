const express = require('express')
const bodyParser = require('body-parser');

const webapp = require('./app');

module.exports = () => {
    const app = express();

    app.use(bodyParser.json({}));
    
    webapp(app);

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => console.log("Bonus site listenning at port " + PORT));
}
