module.exports = async (visite, visiteRepo) => {
    try {
        return await visiteRepo.create(visite);
    } catch(err){
        console.log(err);
        return null;
    }
}