module.exports = async (visiteRepo) => {
    try {
        return await visiteRepo.findAll();
    } catch(err){
        console.log(err);
        return null;
    }
}