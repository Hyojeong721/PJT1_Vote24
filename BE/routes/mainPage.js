const express = require("express");
const router = express.Router();

const { pool } = require("../utils/mysql");
const { logger } = require("../utils/winston");
const { verifyToken } = require("../utils/jwt");

router.get("/main", verifyToken, (req, res) => {
  try {
    logger.info("GET '/'");
    res.send("hello world");
  } catch {
    logger.error("GET '/ Error" + error);
    return res.json(error);
  }
});

module.exports = router;
