const UserRepos = require('../../../application/repository/UserRepo');

const Model = require('../models/user');

module.exports = class extends UserRepos {

    async create(user){
        const u = new Model(user);
        return await u.save();
    }
    
    async update(id, user){
        return await Model.findOneAndUpdate({ _id: id }, user, { new: true });
    }

    async findAll(){
        return await Model.find({});
    }
}