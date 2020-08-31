const visite = require('./visite');
const user = require('./user');
const admin = require('./admin');

module.exports = (app) => {

    app.use('/api/admin', admin);
    app.use('/api/visite', visite);
    app.use('/api/user', user);
}