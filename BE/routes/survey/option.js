const express = require("express");
const { pool } = require("../../utils/mysql");
const { logger } = require("../../utils/winston");
const router = express.Router();

// option write.
router.post("/option/:question_id", async (req, res) => {
  const question_id = req.params.question_id;
  const { count, context, weight } = req.body;

  try {
    const sql = `INSERT INTO option ( question_id, count, context, weight ) VALUES(?, ?, ?, ?);`;
    const data = await pool.query(sql, [question_id, count, context, weight]);
    logger.info("[INFO] POST /option/write");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("POST /insert Error" + error);
    return res.json(error);
  }
});

// option update.
router.put("/option/:id", async (req, res) => {
  const id = req.params.id;
  const { count, context, weight } = req.body;
  try {
    const sql = `UPDATE option SET count=?, context=?, weight=? WHERE id = ?;`;
    const data = await pool.query(sql, [count, context, weight, id]);
    logger.info("[INFO] PUT /option/update");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("POST /update Error" + error);
    return res.json(error);
  }
});

// option delete
router.delete("/option/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const sql = `DELETE FROM option WHERE id=?;`;
    const data = await pool.query(sql, [id]);
    logger.info("[INFO] DELETE /option/delete");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("GET /delete Error" + error);
    return res.json(error);
  }
});

// option Detail
router.get("/option/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const sql = `SELECT * FROM option WHERE ID = ?;`;
    const data = await pool.query(sql, [id]);
    const result = data[0];
    logger.info("[INFO] GET /option/detail");
    return res.json(result);
  } catch (error) {
    logger.error("GET /select Error" + error);
    return res.json(error);
  }
});

// option list
router.get("/option/list/:question_id", async (req, res) => {
  try {
    const question_id = req.params.question_id;
    // const { page } = req.query;
    const sql = "SELECT * FROM `option` WHERE question_id=?;";
    const data = await pool.query(sql, [question_id]);
    // const result = data[0].slice((page - 1) * 10, page * 10);
    const result = data[0];
    logger.info("[INFO] GET /option/list");
    return res.json(result);
  } catch (error) {
    logger.error("GET /select Error" + error);
    return res.json(error);
  }
});

module.exports = router;
