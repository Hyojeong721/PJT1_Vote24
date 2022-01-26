const express = require("express");
const jwt = require("jsonwebtoken");

const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { logo_upload } = require("../utils/multer");
const { pool } = require("../utils/mysql");
const { logger } = require("../utils/winston");
const { nameParser } = require("../utils/nameParser");

const router = express.Router();

/*----------------------------------------------------------------------*
 * POST HospitalUser Join
 * Example URL = ../join
 *----------------------------------------------------------------------*/
router.post("/join", logo_upload.single("logo_image"), async (req, res) => {
  const { email, password, name, business_number, phone } = req.body;

  const logo_rename = Date.now() + req.body.logo_name;
  const logo_path = "uploads/logo" + logo_rename;
  nameParser("uploads/logo/", "uploads/logo/", req.body.logo_name, logo_rename);

  try {
    if (req.body.logo_name) {
      const sql = `INSERT INTO hospital_info ( 
                        email, 
                        password, 
                        name, 
                        business_number, 
                        phone, 
                        logo_image) VALUES(?, ?, ?, ?, ?, ?);`;

      const data = await pool.query(sql, [
        email,
        password,
        name,
        business_number,
        phone,
        logo_path,
      ]);
    } else {
      const sql = `INSERT INTO hospital_info ( 
                        email, 
                        password, 
                        name, 
                        business_number, 
                        phone) VALUES(?, ?, ?, ?, ?);`;
      const data = await pool.query(sql, [email, password, name, business_number, phone]);
    }

    logger.info("POST HospitalUser Join");
    return res.json({ result: "Success" });
  } catch (error) {
    logger.error("POST HospitalUser Join " + error);
    return res.json(error);
  }
});

/*----------------------------------------------------------------------*
 * POST HospitalUser Login
 * Example URL = ../login
 *----------------------------------------------------------------------*/
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const sql = `SELECT 
                    id, 
                    email, 
                    password
                    name,
                    code FROM hospital_info WHERE email=?`;
    const data = await pool.query(sql, [email]);
    const UserId = data[0][0].id;
    const code = data[0][0].code;
    const name = data[0][0].name; // name 추가
    const hashedPassword = await hashPassword(data[0][0].password);
    const compareResult = await comparePassword(password, hashedPassword);

    if (!data[0][0]) {
      logger.error("POST HospitalUser Login Fail : No exist ID");
      return res.json({ result: "인증키 발급실패 : 존재하지 않는 아이디 입니다." });
    }

    if (!compareResult) {
      logger.error("POST HospitalUser Login Fail : No exit Password");
      return res.json({ result: "인증키 발급실패 : 비밀번호를 확인해 주세요." });
    }

    const token = jwt.sign(
      {
        id: UserId,
      },
      "ssafy",
      { expiresIn: "24h" }
    );

    logger.info("POST HospitalUser login");
    return res.json({ result: "ok", id: UserId, name: name, code: code, token: token });
  } catch (error) {
    logger.info("POST HospitalUser login " + error);
    return res.json(error);
  }
});

/*----------------------------------------------------------------------*
 * POST HospitalUser emailcheck
 * Example URL = ../emailcheck
 *----------------------------------------------------------------------*/
router.post("/emailCheck", async (req, res) => {
  const email = req.body.email;

  try {
    const sql = `SELECT EXISTS(SELECT * FROM hospital_info where email = ? ) as isHava;`;
    const data = await pool.query(sql, [email]);

    if (data[0][0].isHava === 1) {
      logger.info("POST HospitalUser emailcheck Fail");
      return res.json({ result: "notok" });
    } else {
      logger.info("POST HospitalUser emailcheck Success");
      return res.json({ result: "ok" });
    }
  } catch (error) {
    logger.error("POST HospitalUser emailcheck " + error);
    return res.json(error);
  }
});

/*----------------------------------------------------------------------*
 * GET HospitalUser bnNumberCheck
 * Example URL = ../bnNumberCheck
 *----------------------------------------------------------------------*/
router.post("/bnNumberCheck", async (req, res) => {
  const business_number = req.body.business_number;

  try {
    const sql = `SELECT EXISTS(SELECT * FROM hospital_info where business_number = ? ) as isHava;`;
    const data = await pool.query(sql, [business_number]);

    if (data[0][0].isHava == 1) {
      logger.info("POST HospitalUser bnNumberCheck Fail");
      return res.json({ result: "notok" });
    } else {
      logger.info("POST HospitalUser bnNumberCheck Success");
      return res.json({ result: "ok" });
    }
  } catch (error) {
    logger.error("POST HospitalUser bnNumberCheck " + error);
    return res.json(error);
  }
});

module.exports = router;
