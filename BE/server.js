// Installed Package Import
const express = require("express");
const multer = require("multer");
const fs = require("fs");

// Utils Function Import
const { pool } = require("./utils/mysql");
const { logger } = require("./utils/winston");

const PORT = 80;
const server = express();
const upload = multer({ dest: "./upload" });

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/image", express.static("./upload"));
server.use(cors());

server.get("/", (req, res) => {
  try{
    logger.error("GET '/'");
    console.log("GET '/'");
    res.send("hello world");
  } catch{
    logger.error("GET '/ Error" + error);
    console.log("GET '/' Error" + error);
    return res.json(error);
  }

});

server.post("/login", upload.single("image"), async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const sql = `SELECT password FROM hospital_info WHERE email=?`;
    const data = await pool.query(sql, [email]);
    return res.json({ result: "ok" });
  } catch {}
});

server.post("/join", upload.single("image"), async (req, res) => {
  // console.log(req.body);
  // const params = req.body;
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const business_number = req.body.business_number;
  const phone = req.body.phone;
  const logo_image = req.body.logo_image;

  // console.log("email : [" + email + "]");
  if (logo_image) {
    const image = "/image/" + logo_image;
    try {
      const sql = `INSERT INTO hospital_info (email, password, name, business_number, phone, logo_image) VALUES(?, ?, ?, ?, ?, ?);`;
      const data = await pool.query(sql, [email, password, name, business_number, phone, image]);
      logger.info("[INFO] GET /join");
      return res.json({ result: "ok" });
    } catch (error) {
      logger.error("POST /join Error" + error);
      console.log("POST /join Error" + error);
      return res.json(error);
    }
  } else {
    try {
      const sql = `INSERT INTO hospital_info (email, password, name, business_number, phone) VALUES(?, ?, ?, ?, ?);`;
      const data = await pool.query(sql, [email, password, name, business_number, phone]);
      logger.info("[INFO] GET /join");
      return res.json({ result: "ok" });
    } catch (error) {
      logger.error("POST /join Error" + error);
      console.log("POST /join Error" + error);
      return res.json(error);
    }
  }
});

server.listen(PORT, function () {
  logger.info("Server listening on port 80");
  console.log("Server open port 80");
});
