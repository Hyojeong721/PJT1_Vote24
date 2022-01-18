const express = require("express");
const router = express.Router();
const hospital_join = require("./hospital_user/join");
const hospital_login = require("./hospital_user/login");

router.use("/api", hospital_join);
router.use("/api", hospital_login);

module.exports = router;
