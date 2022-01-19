const express = require("express");
const router = express.Router();

const mainPage_userRouter = require("./mainPage");
const eventPage_userRouter = require("./eventPage");
const hospital_userRouter = require("./hospital_user/join");

router.use("/api", hospital_userRouter);
router.use("/api", mainPage_userRouter);
router.use("/api", eventPage_userRouter);

module.exports = router;

