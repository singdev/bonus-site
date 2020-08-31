
const mongoose = require('mongoose');

module.exports = mongoose.model('Admin', mongoose.Schema({
    identifiant: { type: String, require: true, unique: true },
    password: { type: String, require: true },
}));