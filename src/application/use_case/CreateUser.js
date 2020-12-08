
module.exports = async (user, userRepo, crypto) => {
    try {
        user.password = await crypto.hash(user.password);
        return await userRepo.create(user);
    } catch(err){
        console.log(err);
        return null;
    }
}