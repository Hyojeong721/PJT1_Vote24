const express = require("express");
const { pool } = require("../../utils/mysql");
const { logger } = require("../../utils/winston");
const { verifyToken } = require("../../utils/jwt");
const router = express.Router();

// subjective_answer write.
router.post("/subjective_answer/:question_id", async (req, res) => {
  const question_id = req.params.question_id;
  const { answer } = req.body;

  try {
    const sql = `INSERT INTO subjective_answer ( question_id, answer ) VALUES(?, ?);`;
    const data = await pool.query(sql, [question_id, answer]);
    logger.info("[INFO] POST /subjective_answer/write");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("POST /insert Error" + error);
    return res.json(error);
  }
});

// subjective_answer update.
router.put("/subjective_answer/:id", async (req, res) => {
  const id = req.params.id;
  const { answer } = req.body;
  try {
    const sql = `UPDATE subjective_answer SET answer=? WHERE id = ?;`;
    const data = await pool.query(sql, [answer, id]);
    logger.info("[INFO] PUT /subjective_answer/update");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("POST /update Error" + error);
    return res.json(error);
  }
});

// subjective_answer delete
router.delete("/subjective_answer/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const sql = `DELETE FROM subjective_answer WHERE id=?;`;
    const data = await pool.query(sql, [id]);
    logger.info("[INFO] DELETE /subjective_answer/delete");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("GET /delete Error" + error);
    return res.json(error);
  }
});

// subjective_answer Detail
router.get("/subjective_answer/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const sql = `SELECT * FROM subjective_answer WHERE ID = ?;`;
    const data = await pool.query(sql, [id]);
    const result = data[0];
    logger.info("[INFO] GET /subjective_answer/detail");
    return res.json(result);
  } catch (error) {
    logger.error("GET /select Error" + error);
    return res.json(error);
  }
});

// subjective_answer list
router.get("/subjective_answer/list/:question_id", async (req, res) => {
  try {
    const question_id = req.params.question_id;
    // const { page } = req.query;
    const sql = `SELECT * FROM subjective_answer WHERE question_id=?;`;
    const data = await pool.query(sql, [question_id]);
    // const result = data[0].slice((page - 1) * 10, page * 10);
    const result = data[0];
    logger.info("[INFO] GET /subjective_answer/list");
    return res.json(result);
  } catch (error) {
    logger.error("GET /select Error" + error);
    return res.json(error);
  }
});

module.exports = router;
