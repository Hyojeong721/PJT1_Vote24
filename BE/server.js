// Installed Package Import
const express = require("express");
const fs = require("fs");
const cors = require("cors");

// Utils Function Import
const { pool } = require("./utils/mysql");
const { logger } = require("./utils/winston");

const PORT = 80;
const server = express();

const routes = require("./routes");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use("/", routes);

server.get("/", (req, res) => {
  try {
    logger.error("GET '/'");
    console.log("GET '/'");
    res.send("hello world");
  } catch {
    logger.error("GET '/ Error" + error);
    console.log("GET '/' Error" + error);
    return res.json(error);
  }
});

server.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const sql = `SELECT password FROM hospital_info WHERE email=?`;
    const data = await pool.query(sql, [email]);
    return res.json({ result: "ok" });
  } catch {}
});

server.listen(PORT, function () {
  logger.info("Server listening on port 80");
  console.log("Server open port 80");
});
