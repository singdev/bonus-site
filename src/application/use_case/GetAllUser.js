
module.exports = async (userRepo) => {
    try {
        return await userRepo.findAll();
    } catch(err){
        console.log(err);
        return null;
    }
}