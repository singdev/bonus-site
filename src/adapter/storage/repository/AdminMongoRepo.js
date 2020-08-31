const UserRepos = require('../../../application/repository/AdminRepo');

const Model = require('../models/admin');

module.exports = class extends UserRepos {

    async create(user){
        const u = new Model(user);
        return await u.save();
    }

    async find(identifiant){
        const r =  await Model.findOne({ identifiant: identifiant});
        console.log(r);
        return r;
    }
}