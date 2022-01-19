const express = require("express");
const router = express.Router();

const { pool } = require("../../utils/mysql");
const { logger } = require("../../utils/winston");

router.post("/emailCheck", async (req, res) => {
  const email = req.body.email;
  try {
    const sql = `SELECT EXISTS(SELECT * FROM hospital_info where email = ? ) as isHava;`;
    const data = await pool.query(sql, [email]);
    console.log(data[0][0].isHava);
    if (data[0][0].isHava == 1) {
      logger.info("[INFO] POST /emailCheck");
      return res.json({ result: "notok" });
    } else {
      logger.info("[INFO] POST /emailCheck");
      return res.json({ result: "ok" });
    }
  } catch (error) {
    logger.error("POST /emailCheck Error" + error);
    console.log("POST /emailCheck Error" + error);
    return res.json(error);
  }
});

router.post("/bnNumberCheck", async (req, res) => {
  const business_number = req.body.business_number;
  try {
    const sql = `SELECT EXISTS(SELECT * FROM hospital_info where business_number = ? ) as isHava;`;
    const data = await pool.query(sql, [business_number]);
    console.log(data[0][0].isHava);
    if (data[0][0].isHava == 1) {
      logger.info("[INFO] POST /bnNumberCheck");
      return res.json({ result: "notok" });
    } else {
      logger.info("[INFO] POST /bnNumberCheck");
      return res.json({ result: "ok" });
    }
  } catch (error) {
    logger.error("POST /bnNumberCheck Error" + error);
    console.log("POST /bnNumberCheck Error" + error);
    return res.json(error);
  }
});

module.exports = router;
