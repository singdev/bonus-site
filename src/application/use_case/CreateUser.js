
module.exports = async (user, userRepo) => {
    try {
        return await userRepo.create(user);
    } catch(err){
        console.log(err);
        return null;
    }
}