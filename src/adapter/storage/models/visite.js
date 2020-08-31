
const mongoose = require('mongoose');

module.exports = mongoose.model('Visite', mongoose.Schema({
    action: { type: String, enum: ['index', 'inscription', 'connexion', 'prestataire', 'donneur-dordre', 'marketplace1', 'marketplace2', 'marketplace3',] },
    date: { type: Date, default: Date.now() }
}));