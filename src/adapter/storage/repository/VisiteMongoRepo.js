const VisiteRepo = require('../../../application/repository/VisiteRepo');

const Model = require('../models/visite');

module.exports = class extends VisiteRepo {

    async create(user){
        const v = new Model(user);
        return await v.save();
    }

    async findAll(){
        return await Model.find({});
    }
}