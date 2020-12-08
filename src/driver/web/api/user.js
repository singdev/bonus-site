const router = require('express').Router();

const UserRepo = require('../../../adapter/storage/repository/UserMongoRepo');
const CreateUser = require('../../../application/use_case/CreateUser');
const UpdateUser = require('../../../application/use_case/UpdateUser.js');
const GetAllUser = require('../../../application/use_case/GetAllVisite');

const email = require("../../../../my_module/email_nho");

const adminAuthController = require('../../../adapter/controller/adminAuthController');

const userRepo = new UserRepo();

function emailForUser(user){
    return `
    <html>
      <div style="padding: 1rem;">
        <p>
            Bonjour ${user.nom.toUpperCase()} ${user.prenom}, <br><br>
            
            Nous vous remercions d'avoir rejoind la team BONUS pour repondre aux besoins des entreprises locales.
            
            Nous avons bien recu votre demande et notre equipe vous re-contactera pour avoir plus d'informations afin de vous creer un compte sur la plateforme d'intermediation. <br><br>
            
            Ainsi vous pourrez parcourirs la marketplace et postuler aux differentes offres en soumettant des propositions technique et financieres, CV, ..., <br><br>
            
            Cordialement,
        </p>
      </div>
    </html>
    `;
}

function emailForDonneur(user){
    return `
    <html>
      <div style="padding: 1rem;">
        <p>
            Bonjour ${user.nom.toUpperCase()} ${user.prenom}, <br><br>
            
            Nous vous remercions d'avoir rejoind la team BONUS pour participer a la creation d'emploi.
            
            Nous avons bien recu votre demande et notre equipe vous re-contactera pour avoir plus d'informations afin de vous creer un compte sur la plateforme d'intermediation. <br><br>
            
            Ainsi vous pourrez publier vos appel d'offre sur la marketplace de BONUS, <br><br>
            
            Cordialement,
        </p>
      </div>
    </html>
    `;
}

function emailForBONUS(user){
    return `
    <html>
      <div style="padding: 1rem;">
        <p>
            Bonjour, <br><br>
            
            Le systeme BONUS vient de recevoir une nouvelle demande d'inscription, <br><br>
            ${user.nom.toUpperCase()} ${user.prenom} <br>
            ${user.type} <br><br>
            Cordialement,
        </p>
      </div>
    </html>
    `;
}

router.get("/", adminAuthController.verifyAccessToken, async (req, res, next) => {
    const r = await GetAllUser(userRepo);
    if(r){
        res.send(r);
    } else {
        res.sendStatus(500);
    }
});

router.post("/", async (req, res, next) => {
    const r = await CreateUser(req.body, userRepo);
    if(r){
        if(req.body.type == "prestataire") {
            try {
                await  email.sendEmail(req.body.email, "Demande d'inscription a BONUS", emailForUser(req.body), "BONUS");
              } catch(err){
                  console.log(err);
              }
        } else {
            try {
                await  email.sendEmail(req.body.email, "Demande d'inscription a BONUS", emailForDonneur(req.body), "BONUS");
              } catch(err){
                  console.log(err);
              }
        }
        
        try {
            await  email.sendEmail("contact@gobonus.ga", "BONUS Demande d'inscription", emailForBONUS(req.body), "BONUS");
          } catch(err){
              console.log(err);
          }
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
});

router.post("/update/:id", adminAuthController.verifyAccessToken, async (req, res, next) => {
    const r = await UpdateUser(req.params.id, req.body, userRepo);
    if(r){
        res.send(r);
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;