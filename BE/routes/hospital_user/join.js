const express = require("express");
const router = express.Router();
const { upload } = require("../../utils/multer");
const fs = require("fs");

const { pool } = require("../../utils/mysql");
const { logger } = require("../../utils/winston");

const createRandomNumber = () => {
  return Math.floor(Math.random() * 10000000) % 1000000;
};

router.post("/join", upload.single("image"), async (req, res) => {

  const id = createRandomNumber();
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const business_number = req.body.business_number;
  const phone = req.body.phone;
  const logo_image = req.body.logo_image;

  const image = "/image/" + id + "/"+ logo_image;
  try {
    if (logo_image) {
      const sql = `INSERT INTO hospital_info (id, email, password, name, business_number, phone, logo_image) VALUES(?, ?, ?, ?, ?, ?, ?);`;
      const data = await pool.query(sql, [id, email, password, name, business_number, phone, image]);
    } else {
      const sql = `INSERT INTO hospital_info (id, email, password, name, business_number, phone) VALUES(?, ?, ?, ?, ?, ?);`;
      const data = await pool.query(sql, [id, email, password, name, business_number, phone]);
    }
    logger.info("[INFO] GET /join");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("POST /join Error" + error);
    return res.json(error);
  }
});

module.exports = router;
