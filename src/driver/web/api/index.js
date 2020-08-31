const visite = require('./visite');

module.exports = (app) => {

    app.use('/api/visite', visite);
}