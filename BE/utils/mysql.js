const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "172.19.0.2",
  user: "a205",
  password: "ssafy1!",
  database: "ssafy24",
  writeforConnection: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = { pool };
