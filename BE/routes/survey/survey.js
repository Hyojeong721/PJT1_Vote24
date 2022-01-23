const express = require("express");
const { pool } = require("../../utils/mysql");
const { logger } = require("../../utils/winston");
const router = express.Router();

// survey write.
router.post("/survey/:hospital_id", async (req, res) => {
  const hospital_id = req.params.hospital_id;
  const { title, context, output_link, start_at, end_at } = req.body;

  try {
    if (req.body.end_at) {
      const sql = `INSERT INTO hospital_survey ( hospital_id, title, context, output_link, start_at, end_at ) VALUES(?, ?, ?, ?, ?, ?);`;
      const data = await pool.query(sql, [
        hospital_id,
        title,
        context,
        output_link,
        start_at,
        end_at,
      ]);
    } else {
      const sql = `INSERT INTO hospital_survey ( hospital_id, title, context, output_link, start_at ) VALUES(?, ?, ?, ?, ?);`;
      const data = await pool.query(sql, [hospital_id, title, context, output_link, start_at]);
    }
    logger.info("[INFO] POST /survey/write");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("POST /insert Error" + error);
    return res.json(error);
  }
});

// survey update.
router.put("/survey/:id", async (req, res) => {
  const id = req.params.id;
  const { title, context, output_link, start_at, end_at } = req.body;
  try {
    if (req.body.end_at) {
      const sql = `UPDATE hospital_survey SET title=?, context=?, output_link=?, start_at=?, end_at=? WHERE id = ?;`;
      const data = await pool.query(sql, [title, context, output_link, start_at, end_at, id]);
    } else {
      const sql = `UPDATE hospital_survey SET title=?, context=?, output_link=?, start_at=? WHERE id = ?;`;
      const data = await pool.query(sql, [title, context, output_link, start_at, id]);
    }
    logger.info("[INFO] PUT /survey/update");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("POST /update Error" + error);
    return res.json(error);
  }
});

// survey delete
router.delete("/survey/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const sql = `DELETE FROM hospital_survey WHERE id=?;`;
    const data = await pool.query(sql, [id]);

    logger.info("[INFO] DELETE /survey/delete");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("GET /delete Error" + error);
    return res.json(error);
  }
});

// survey Detail
router.get("/survey/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const sql = `SELECT * FROM hospital_survey WHERE ID = ?;`;
    const data = await pool.query(sql, [id]);
    const result = data[0];

    logger.info("[INFO] GET /survey/detail");
    return res.json(result);
  } catch (error) {
    logger.error("GET /select Error" + error);
    return res.json(error);
  }
});

// survey list
router.get("/survey/list/:hospital_id", async (req, res) => {
  try {
    const hospital_id = req.params.hospital_id;
    // const { page } = req.query;
    const sql = `SELECT * FROM hospital_survey WHERE hospital_id=?;`;
    const data = await pool.query(sql, [hospital_id]);
    // const result = data[0].slice((page - 1) * 10, page * 10);
    const result = data[0];
    logger.info("[INFO] GET /survey/list");
    return res.json(result);
  } catch (error) {
    logger.error("GET /select Error" + error);
    return res.json(error);
  }
});

module.exports = router;