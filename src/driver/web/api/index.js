const visite = require('./visite');
const user = require('./user');
const admin = require('./admin');

module.exports = (app) => {

    app.use('/api/admin', admin);
    app.use('/api/visite', visite);
    app.use('/api/user', user);
    
    app.get("/uploads/:filename", async (req, res, next) => {
        res.download("/tmp/uploads/" + req.params.filename);
    });
}

