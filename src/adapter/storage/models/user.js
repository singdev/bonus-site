
const mongoose = require('mongoose');

module.exports = mongoose.model('User', mongoose.Schema({
    nom: { type: String },
    prenom: { type: String },
    email: { type: String },
    entreprise: { type: String },
    date: { type: Date, default: Date.now() },
    type: { type: String, enum: ['prestataire', 'donneur-dordre'] },
    isRegister: { type: Boolean, default: false }
}));