const router = require("express").Router();
const auth = require("../../../../my_module/auth_mdp");
const userMemory = require("../../database/memory/users");

const adminController = require("../../../adapter/controller/adminController");

router.get('/utilisateurs',  auth.verfiySessionToken, (req, res, next) => {
    if(req.auth){
        adminController.usersPage(req, res,next);
    } else {
        res.redirect("/admin/login");
    }
});

router.get('/login', auth.verfiySessionToken, (req, res, next) => {
    if(req.auth){
        res.redirect("/admin/utilisateurs");
    } else {
        adminController.loginPage(req, res, next);
    }
});

router.post('/login', async (req, res, next) => {
   const result = await auth.auth({email: req.body.email}, req.body.password, userMemory); 
   if(result == auth.AuthentificationResult.AUTH){
       await auth.createSession(req.body.email, res, userMemory);
       res.redirect("/admin/utilisateurs");
   } else {
       res.redirect("/admin/login");
   }
});

router.get('/logout', async (req, res, next) => {
    auth.closeSession(res);
    res.redirect("/admin/login");
})

module.exports = router;