const router = require('express').Router();

router.get("/login", (req, res) => {
    res.render('sincro/login.pug');
});

module.exports = router;