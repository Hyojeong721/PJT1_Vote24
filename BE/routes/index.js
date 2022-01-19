const express = require("express");
const router = express.Router();

const mainPage_userRouter = require("./main");
const hospital_userRouter = require("./hospital_user/join");
const hospital_userRouter_login = require("./hospital_user/login");
const duplicate_checkRouter = require("./hospital_user/duplicate_check");

router.use("/api", hospital_userRouter);
router.use("/api", hospital_userRouter_login);
router.use("/api", duplicate_checkRouter);
router.use("/api", mainPage_userRouter);

module.exports = router;
