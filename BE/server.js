// Installed Package Import
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const helmet = require("helmet");

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
server.use(helmet());

server.listen(PORT, function () {
  logger.info("Server listening on port 80");
  console.log("Server open port 80");
});
