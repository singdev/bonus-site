const plan =  require("./admin");

module.exports = {
    findOne: async (condition) => {
        const p = await plan();
        if(condition.email == p.email){
            return p;
        } else {
            return null;
        }
    }
}
