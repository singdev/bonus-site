module.exports = {
    
    loginPage(req, res, next){
        res.render("admin/login.pug", { title: "Admin | Login"});
    },
    
    usersPage(req, res, next){
        res.render("admin/users.pug", { title: "Admin | Utilisateurs"});
    },

}