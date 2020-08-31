module.exports = async (admin, adminRepo, bcrypt) => {
    try {
        admin.password = await bcrypt.hash(admin.password);
        return await adminRepo.create(admin);
    } catch(err){
        console.log(err);
        return null;
    }
}