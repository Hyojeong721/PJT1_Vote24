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
      return res.json({ result: "이미 가입된 email 입니다." });
    } else {
      return res.json({ result: "가압가능한 email 입니다." });
    }
  } catch (error) {
    logger.error("POST /join Error" + error);
    console.log("POST /join Error" + error);
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
      return res.json({ result: "이미 가입된 사업자 등록번호 입니다." });
    } else {
      return res.json({ result: "가압가능한 사업자 등록번호 입니다." });
    }
  } catch (error) {
    logger.error("POST /join Error" + error);
    console.log("POST /join Error" + error);
    return res.json(error);
  }
});

module.exports = router;
