const visite = require('./visite');
const user = require('./user');

module.exports = (app) => {

    app.use('/api/visite', visite);
    app.use('/api/user', user);
}