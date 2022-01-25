const express = require("express");
const { pool } = require("../../utils/mysql");
const { logger } = require("../../utils/winston");
const router = express.Router();

// score_sum write.
router.post("/score_sum/:survey_id", async (req, res) => {
  const survey_id = req.params.survey_id;
  const { score_sum } = req.body;

  try {
    const sql = `INSERT INTO score_sum ( survey_id, score_sum ) VALUES(?, ?);`;
    const data = await pool.query(sql, [survey_id, score_sum]);
    logger.info("[INFO] POST /score_sum/write");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("POST /insert Error" + error);
    return res.json(error);
  }
});

// score_sum update.
router.put("/score_sum/:id", async (req, res) => {
  const id = req.params.id;
  const { score_sum } = req.body;
  try {
    const sql = `UPDATE score_sum SET score_sum=? WHERE id = ?;`;
    const data = await pool.query(sql, [score_sum, id]);
    logger.info("[INFO] PUT /score_sum/update");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("POST /update Error" + error);
    return res.json(error);
  }
});

// score_sum delete
router.delete("/score_sum/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const sql = `DELETE FROM score_sum WHERE id=?;`;
    const data = await pool.query(sql, [id]);
    logger.info("[INFO] DELETE /score_sum/delete");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("GET /delete Error" + error);
    return res.json(error);
  }
});

// score_sum Detail
router.get("/score_sum/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const sql = `SELECT * FROM score_sum WHERE ID = ?;`;
    const data = await pool.query(sql, [id]);
    const result = data[0];
    logger.info("[INFO] GET /score_sum/detail");
    return res.json(result);
  } catch (error) {
    logger.error("GET /select Error" + error);
    return res.json(error);
  }
});

// score_sum AVG
router.get("/score_sum/avg/:survey_id", async (req, res) => {
  const survey_id = req.params.survey_id;
  try {
    const sql = `select avg(score_sum) from score_sum where survey_id = ?;`;
    const data = await pool.query(sql, [survey_id]);
    const result = data[0];
    logger.info("[INFO] GET /score_sum/avg");
    return res.json(result);
  } catch (error) {
    logger.error("GET /select Error" + error);
    return res.json(error);
  }
});

// score_sum list
router.get("/score_sum/list/:survey_id", async (req, res) => {
  try {
    const survey_id = req.params.survey_id;
    // const { page } = req.query;
    const sql = `SELECT * FROM score_sum WHERE survey_id=?;`;
    const data = await pool.query(sql, [survey_id]);
    // const result = data[0].slice((page - 1) * 10, page * 10);
    const result = data[0];
    logger.info("[INFO] GET /score_sum/list");
    return res.json(result);
  } catch (error) {
    logger.error("GET /select Error" + error);
    return res.json(error);
  }
});

module.exports = router;
