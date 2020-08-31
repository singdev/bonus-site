const router = require('express').Router();

router.get("/", (req, res) => {
    res.render('register_prestataire.pug');
});

module.exports = router;