const express = require("express");
const controller = require("../controller/user");
const router = express.Router();

router.post("/login", controller.Cpost_login);

router.post("/register", controller.Cpost_register);

router.post("/register/checkUserId", controller.Cpost_checkUserId);

router.post("/mypage/logout", controller.Cpost_logout);

router.post("/mypage", controller.getUserInfo);

router.post("/mypage/changePassword", controller.Cpost_changePassword);

module.exports = router;
