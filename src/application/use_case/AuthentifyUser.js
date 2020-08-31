module.exports = async (identifiant, password,  userRepository, crypto) => {
    const userFound = await userRepository.find(identifiant);
    if(userFound == null){
        throw Error("User not found");
    }
    const comparaisonResult = await crypto.compare(password, userFound.password);
    return comparaisonResult ? userFound : null;
}