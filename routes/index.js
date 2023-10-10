const express = require('express');
const controller = require('../controller/index');
const router = express.Router();

//localhost:PORT/
router.get('/', controller.index);

router.get('/login', controller.Cget_login);

router.get('/register', controller.Cget_register);

router.get('/mypage', controller.Cget_mypage);

///상세페이지
router.get('/intro_seoul', controller.Cget_intro_seoul);
router.get('/intro_busan', controller.Cget_intro_busan);
router.get('/intro_gangneung', controller.Cget_intro_gangneung);
router.get('/intro_jeju', controller.Cget_intro_jeju);
///

module.exports = router;
