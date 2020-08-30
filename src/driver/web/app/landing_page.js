const router = require('express').Router();

router.get("/", (req, res) => {
    res.render('landing_page.pug');
});

module.exports = router;