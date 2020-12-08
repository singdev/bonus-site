const auth = require("../../../../../my_module/auth_mdp");

module.exports = async () => {
    return {
        _id: "admin@gobonus.ga",
        email: "admin@gobonus.ga",
        password: await auth.encryptPassword("sincrosing2020")
    }
}