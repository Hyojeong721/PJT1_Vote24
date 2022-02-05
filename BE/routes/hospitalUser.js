const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { logo_upload } = require("../utils/multer");
const { pool } = require("../utils/mysql");
const { logger } = require("../utils/winston");
const { nameParser } = require("../utils/nameParser");

const router = express.Router();

router.post("/code/:code", async (req, res) => {
  const code = req.params.code;
  try {
    const sql = "SELECT id FROM hospital_info WHERE code = ?";
    const data = await pool.query(sql, [code]);
    const id = data[0][0].id;
    logger.info("POST /code/:code");
    return res.json({ id: id });
  } catch (error) {
    logger.error("POST /code/:code " + error);
    return res.json(error);
  }
});

router.post("/id/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const sql = "SELECT name, phone, logo_image FROM hospital_info WHERE id = ?";
    const data = await pool.query(sql, [id]);
    let result = data[0][0];
    result.image = "http://i6a205.p.ssafy.io:8000/api/logoimage/" + result.logo_image;
    logger.info("POST /id/:id");
    return res.json(result);
  } catch (error) {
    logger.error("POST /id/:id " + error);
    return res.json(error);
  }
});

// router.get("/test", async (req, res) => {
//   // let dupl = 1;
//   // let code = 0;
//   // while (dupl == 1) {
//   //   code = crypto.randomBytes(3).toString("hex");
//   //   const dupl_sql = "select EXISTS (select * from hospital_info where code=? limit 1) as success;";
//   //   let dupl_data = await pool.query(dupl_sql, [code]);
//   //   dupl = dupl_data[0][0].success;
//   // }
//   // console.log(code);
//   // return res.json(dupl);
//   console.log(router);
// });

/*----------------------------------------------------------------------*
 * POST HospitalUser Join
 * Example URL = ../join
 *----------------------------------------------------------------------*/
router.post("/join", logo_upload.single("logo_image"), async (req, res) => {
  const { email, password, name, business_number, phone } = req.body;
  let dupl = 1;
  let code = 0;
  while (dupl == 1) {
    code = crypto.randomBytes(3).toString("hex");
    const dupl_sql = "select EXISTS (select * from hospital_info where code=? limit 1) as success;";
    let dupl_data = await pool.query(dupl_sql, [code]);
    dupl = dupl_data[0][0].success;
  }

  const logo_rename =
    new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, "") +
    req.body.logo_name;
  // const logo_path = "uploads/logo" + logo_rename;
  nameParser("uploads/logo/", "uploads/logo/", req.body.logo_name, logo_rename);

  try {
    if (req.body.logo_name) {
      const sql = `INSERT INTO hospital_info ( 
                        email, 
                        password, 
                        name, 
                        business_number, 
                        phone,
                        code, 
                        logo_image) VALUES(?, ?, ?, ?, ?, ?, ?);`;

      const data = await pool.query(sql, [
        email,
        password,
        name,
        business_number,
        phone,
        code,
        logo_rename,
      ]);
    } else {
      const sql = `INSERT INTO hospital_info ( 
                        email, 
                        password, 
                        name, 
                        business_number,
                        phone,
                        code) VALUES(?, ?, ?, ?, ?, ?);`;
      const data = await pool.query(sql, [email, password, name, business_number, phone, code]);
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
                    password,
                    name,
                    code FROM hospital_info WHERE email=?`;
    const data = await pool.query(sql, [email]);
    if (!data[0][0]) {
      logger.error("POST HospitalUser Login Fail : No exist ID");
      return res.json({ result: "인증키 발급실패 : 존재하지 않는 아이디 입니다." });
    }
    const UserId = data[0][0].id;
    const code = data[0][0].code;
    const name = data[0][0].name; // name 추가
    const hashedPassword = await hashPassword(data[0][0].password);
    const compareResult = await comparePassword(password, hashedPassword);

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
