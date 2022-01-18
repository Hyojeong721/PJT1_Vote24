const express = require("express");
const router = express.Router();
const hospital_userRouter = require("./hospital_user/join");

router.use("/", hospital_userRouter);

module.exports = router;
