const express = require("express");
const controller = require("../controller/essay");
const router = express.Router();

//localhost:PORT/inshim/route
// router.get("/route", controller.Cgetroute);

//localhost:PORT/inshim/write
router.post("/essay/write", controller.Cpostroute);

//localhost:PORT/inshim/essay/write
router.get("/essay/write", controller.Cgetwrite);

//localhost:PORT/inshim/essay/view
//write페이지에서 view로 post
router.post("/essay", controller.Cpostessay);

//localhost:PORT/inshim/essay
router.get("/essay", controller.Cgetessay);

//GET localhost:8000/inshim/essay/view:idx
router.get("/essay/view/:idx", controller.Cgetidx);

module.exports = router;
