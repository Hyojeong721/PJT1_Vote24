const express = require("express");
const router = express.Router();
const { hashPassword, comparePassword } = require("../../utils/bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../../utils/jwt");

const { pool } = require("../../utils/mysql");
const { logger } = require("../../utils/winston");

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const sql = `SELECT id, email, password FROM hospital_info WHERE email=?`;
    const data = await pool.query(sql, [email]);

    if (data[0][0]) {
      const UserId = data[0][0].id;
      const hashedPassword = await hashPassword(data[0][0].password);
      // console.log("password: [" + password + "]");
      // console.log("hashedPassword : [" + hashedPassword + "]");
      // const compareResult = await comparePassword(password, "ssafypw1!");
      const compareResult = await comparePassword(password, hashedPassword);

      if (compareResult) {
        const token = jwt.sign(
          {
            id: UserId,
          },
          "ssafy",
          { expiresIn: "24h" }
        );
        // console.log(token);
        return res.json({ result: "ok", token: token });
      } else {
        // console.log(compareResult);
        return res.json({ result: "인증키 발급실패 : 비밀번호를 확인해 주세요." });
      }
    } else {
      return res.json({ result: "인증키 발급실패 : 존재하지 않는 아이디 입니다." });
    }
  } catch (error) {
    logger.error("POST /join Error" + error);
    console.log("POST /join Error" + error);
    return res.json(error);
  }
});
module.exports = router;
