const express = require('express');
const controller = require('../controller/route');
const router = express.Router();

router.get('/route', controller.route);

router.post('/userinfo', controller.detail);
router.post('/essay/write', controller.Cpostroute);

module.exports = router;
