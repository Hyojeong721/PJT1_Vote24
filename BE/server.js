/*
 * Installed Package Import
 */
const fs = require("fs");
const express = require("express");
const server = express();
const { pool } = require("./utils/mysql");
const multer = require("multer");
const upload = multer({ dest: "./upload" });

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/image", express.static("./upload"));

server.get("/", (req, res) => {
  res.send("hello world");
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

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
      return res.json({ result: "ok" });
    } catch (error) {
      console.log("Error!!", error);
      return res.json(error);
    }
  } else {
    try {
      const sql = `INSERT INTO hospital_info (email, password, name, business_number, phone) VALUES(?, ?, ?, ?, ?);`;
      const data = await pool.query(sql, [email, password, name, business_number, phone]);
      return res.json({ result: "ok" });
    } catch (error) {
      console.log("Error!!", error);
      return res.json(error);
    }
  }
});

server.listen(80, function () {
  console.log("Server open port 80");
});
