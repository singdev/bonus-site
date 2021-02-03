
const mongoose = require('mongoose');

module.exports = mongoose.model('User', mongoose.Schema({
    nom: { type: String },
    prenom: { type: String },
    email: { type: String },
    entreprise: { type: String },
    date: { type: Date, default: Date.now() },
    type: { type: String, enum: ['prestataire', 'donneur-dordre'] },
    isRegister: { type: Boolean, default: false },
    
    cvURL: { type: String },
    ficheCircuitURL: { type: String },
    reference: { type: String },
    
    failliteURL: { type: String },
    cnssURL: { type: String },
    compteCertifieURL: { type: String },
    impositionURL: { type: String },
    
    adresse: { type: String },
    telephone: { type: String }
}));