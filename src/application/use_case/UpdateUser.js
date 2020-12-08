
module.exports = async (id, user, userRepo) => {
    try {
        console.log(id);
        console.log(user);
        return await userRepo.update(id, user);
    } catch(err){
        console.log(err);
        return null;
    }
}