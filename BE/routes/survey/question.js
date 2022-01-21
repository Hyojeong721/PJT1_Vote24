const express = require("express");
const { pool } = require("../../utils/mysql");
const { logger } = require("../../utils/winston");
const router = express.Router();

// question write.
router.post("/question/:survey_id", async (req, res) => {
  const survey_id = req.params.survey_id;
  const { order, context, type } = req.body;

  try {
    const sql = `INSERT INTO question ( survey_id, order, context, type ) VALUES(?, ?, ?, ?);`;
    const data = await pool.query(sql, [survey_id, order, context, type]);
    logger.info("[INFO] POST /question/write");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("POST /insert Error" + error);
    return res.json(error);
  }
});

// question update.
router.put("/question/:id", async (req, res) => {
  const id = req.params.id;
  const { order, context, type } = req.body;
  try {
    const sql = `UPDATE question SET order=?, context=?, type=? WHERE id = ?;`;
    const data = await pool.query(sql, [order, context, type, id]);
    logger.info("[INFO] PUT /question/update");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("POST /update Error" + error);
    return res.json(error);
  }
});

// question delete
router.delete("/question/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const sql = `DELETE FROM question WHERE id=?;`;
    const data = await pool.query(sql, [id]);
    logger.info("[INFO] DELETE /question/delete");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("GET /delete Error" + error);
    return res.json(error);
  }
});

// question Detail
router.get("/question/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const sql = `SELECT * FROM question WHERE ID = ?;`;
    const data = await pool.query(sql, [id]);
    const result = data[0];
    logger.info("[INFO] GET /question/detail");
    return res.json(result);
  } catch (error) {
    logger.error("GET /select Error" + error);
    return res.json(error);
  }
});

// question list
router.get("/question/list/:survey_id", async (req, res) => {
  try {
    const survey_id = req.params.survey_id;
    // const { page } = req.query;
    const sql = `SELECT * FROM question WHERE survey_id=?;`;
    const data = await pool.query(sql, [survey_id]);
    // const result = data[0].slice((page - 1) * 10, page * 10);
    const result = data[0];
    logger.info("[INFO] GET /question/list");
    return res.json(result);
  } catch (error) {
    logger.error("GET /select Error" + error);
    return res.json(error);
  }
});

module.exports = router;
