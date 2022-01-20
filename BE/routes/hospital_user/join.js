const express = require("express");

const router = express.Router();

const { logo_upload } = require("../../utils/multer")
const { pool } = require("../../utils/mysql");
const { logger } = require("../../utils/winston");
const { nameParser } = require('../../utils/nameParser');

// const createRandomNumber = () => {
//   return Math.floor(Math.random() * 10000000) % 1000000;
// };

router.post('/join', logo_upload.single('logo_image'), async (req, res) => {

  const logo_rename = Date.now() + req.body.logo_name;
  const logo_path = "uploads/" + logo_rename;

  const {
    email,
    password,
    name,
    business_number,
    phone
  } = req.body;

  nameParser("uploads", "uploads", req.body.logo_name, logo_rename);

  // fs.rename("uploads/" + req.body.logo_name, "uploads/" + logo_rename, (err) =>{
  //   if(err){
  //     logger.error("Fail Rename" + err);
  //   }
  // });

  try {
  if (req.body.logo_name) {
    const sql = `INSERT INTO hospital_info ( email, password, name, business_number, phone, logo_image) VALUES(?, ?, ?, ?, ?, ?);`;
    const data = await pool.query(sql, [ email, password, name, business_number, phone, logo_path]);
  } else {
    const sql = `INSERT INTO hospital_info ( email, password, name, business_number, phone) VALUES(?, ?, ?, ?, ?);`;
    const data = await pool.query(sql, [ email, password, name, business_number, phone]);
  }
  logger.info("GET /join");
  return res.json({ result: "ok" });
} catch (error) {
  logger.error("POST /join Error" + error);
  return res.json(error);
}
});

module.exports = router;
