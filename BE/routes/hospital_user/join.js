const express = require("express");
const router = express.Router();
const { upload } = require("../../utils/multer");
const fs = require("fs");
const path = require("path");

const { pool } = require("../../utils/mysql");
const { logger } = require("../../utils/winston");
const { runInContext } = require("vm");

const createRandomNumber = () => {
  return Math.floor(Math.random() * 10000000) % 1000000;
};

router.post("/join", upload.single("logo_image"), async (req, res) => {
  const logo_rename = Date.now() + req.body.logo_name;
  const logo_path = "uploads/" + logo_rename;
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const business_number = req.body.business_number;
  const phone = req.body.phone;

  fs.rename("uploads/" + req.body.logo_name, "uploads/" + logo_rename, (err) => {
    if (err) {
      logger.error("Fail Rename" + err);
    }
  });

  try {
    if (req.body.logo_name) {
      const sql = `INSERT INTO hospital_info ( email, password, name, business_number, phone, logo_image) VALUES(?, ?, ?, ?, ?, ?);`;
      const data = await pool.query(sql, [
        email,
        password,
        name,
        business_number,
        phone,
        logo_path,
      ]);
    } else {
      const sql = `INSERT INTO hospital_info ( email, password, name, business_number, phone) VALUES(?, ?, ?, ?, ?);`;
      const data = await pool.query(sql, [email, password, name, business_number, phone]);
    }
    logger.info("[INFO] GET /join");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("POST /join Error" + error);
    return res.json(error);
  }
});

module.exports = router;
