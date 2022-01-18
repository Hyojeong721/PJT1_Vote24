const express = require("express");
const router = express.Router();
const { upload } = require("../../utils/multer");
const fs = require("fs");

const { pool } = require("../../utils/mysql");
const { logger } = require("../../utils/winston");

router.post("/join", upload.single("image"), async (req, res) => {
  // console.log(req.body);
  // const params = req.body;
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const business_number = req.body.business_number;
  const phone = req.body.phone;
  const logo_image = req.body.logo_image;
  // console.log("email : [" + email + "]");
  const image = "/image/" + logo_image;
  try {
    if (logo_image) {
      const sql = `INSERT INTO hospital_info (email, password, name, business_number, phone, logo_image) VALUES(?, ?, ?, ?, ?, ?);`;
      const data = await pool.query(sql, [email, password, name, business_number, phone, image]);
    } else {
      const sql = `INSERT INTO hospital_info (email, password, name, business_number, phone) VALUES(?, ?, ?, ?, ?);`;
      const data = await pool.query(sql, [email, password, name, business_number, phone]);
    }
    logger.info("[INFO] GET /join");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("POST /join Error" + error);
    console.log("POST /join Error" + error);
    return res.json(error);
  }
});

module.exports = router;
