const express = require("express");
const fs = require("fs");
const path = require("path");

const { pool } = require("../utils/mysql");
const { logger } = require("../utils/winston");
const { service_upload } = require("../utils/multer");
const { nameParser } = require("../utils/nameParser");

const router = express.Router();

/*----------------------------------------------------------------------*
 * POST Service Notice Detail
 * Example URL = ../service
 *----------------------------------------------------------------------*/
router.post("/service", service_upload.single("service_notice_image"), async (req, res) => {
  const { title, context, fixed, attachment } = req.body;

  const rename =
    new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, "") +
    attachment;
  const path = "uploads/service/" + rename;

  try {
    if (req.body.attachment) {
      nameParser("uploads/service", "uploads/service", attachment, rename);
      const sql = `INSERT INTO service_notice ( 
                        title, 
                        context, 
                        fixed, 
                        attachment) VALUES(?, ?, ?, ?);`;
      const data = await pool.query(sql, [title, context, fixed, path]);
    } else {
      const sql = `INSERT INTO service_notice ( 
                        title, 
                        context, 
                        fixed) VALUES(?, ?, ?);`;
      const data = await pool.query(sql, [title, context, fixed]);
    }
    const LAST_INSERT_ID = `SELECT LAST_INSERT_ID() as auto_id;`;
    const data_id = await pool.query(LAST_INSERT_ID);
    const create_id = data_id[0][0].auto_id;
    logger.info("POST Event Detail");
    return res.json({ state: "Success", id: create_id });
  } catch (error) {
    logger.error("POST Service Notice Detail " + error);
    return res.json({ state: "Fail" });
  }
});

/*----------------------------------------------------------------------*
 * PUT Service Notice Detail
 * Example URL = ../service/1
 *----------------------------------------------------------------------*/
router.put("/service/:id", service_upload.single("service_notice_image"), async (req, res) => {
  const id = req.params.id;
  const { title, context, fixed, attachment } = req.body;

  const rename = Date() + attachment;
  const path = "uploads/service/" + rename;

  try {
    if (req.body.attachment) {
      nameParser("uploads/service", "uploads/service", attachment, rename);
      const sql = `UPDATE service_notice SET 
                      title=?, 
                      context=?, 
                      fixed=?, 
                      attachment=? WHERE id=?;`;
      const data = await pool.query(sql, [title, context, fixed, path, id]);
    } else {
      const sql = `UPDATE service_notice SET 
                      title=?, 
                      context=?, 
                      fixed=? WHERE id=?;`;
      const data = await pool.query(sql, [title, context, fixed, id]);
    }

    logger.info("PUT Service Notice Detail");
    return res.json({ result: "Success" });
  } catch (error) {
    logger.error("PUT Service Notice Detail " + error);
    return res.json(error);
  }
});

/*----------------------------------------------------------------------*
 * DELETE Service Notice Detail
 * Example URL = ../service/1
 *----------------------------------------------------------------------*/
router.delete("/service/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const sql = `DELETE FROM service_notice WHERE id=?;`;
    const data = await pool.query(sql, [id]);

    logger.info("DELETE Service Notice Detail");
    return res.json({ result: "Success" });
  } catch (error) {
    logger.error("DELETE Service Notice Detail " + error);
    return res.json(error);
  }
});

/*----------------------------------------------------------------------*
 * GET Service Notice Detail
 * Example URL = ../service/1
 *----------------------------------------------------------------------*/
router.get("/service/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const sqlInc = `UPDATE service_notice SET views = views+1 WHERE id = ?;`;
    await pool.query(sqlInc, [id]);
    const sql = `SELECT * FROM service_notice WHERE ID = ?;`;
    const data = await pool.query(sql, [id]);
    let result = data[0];
    logger.info("GET Service Notice Detail");
    return res.json(result);
  } catch (error) {
    logger.error("GET Service Notice Detail " + error);
    return res.json(error);
  }
});

/*----------------------------------------------------------------------*
 * GET Service Notice List
 * Example URL = ../service/1
 *----------------------------------------------------------------------*/
router.get("/service/", async (req, res) => {
  try {
    // front에서 필요한 부분만 보내도록 쿼리 수정가능

    const { page } = req.query;
    const sql = `SELECT * FROM service_notice;`;
    const data = await pool.query(sql);
    const result = data[0].slice((page - 1) * 10, page * 10);

    logger.info("GET Service Notice List");
    return res.json(result);
  } catch (error) {
    logger.error("GET Service Notice List " + error);
    return res.json(error);
  }
});

/*----------------------------------------------------------------------*
 * GET Service File Download
 * Example URL = ../service/3/download
 *----------------------------------------------------------------------*/
router.get("/service/:id/download", async (req, res) => {
  const id = req.params.id;

  try {
    const sql = `SELECT attachment FROM service_notice WHERE id=?`;
    const data = await pool.query(sql, [id]);
    const filepath = data[0][0].attachment;

    logger.info("GET Service File Download");
    return res.download(path.join(__dirname, filepath));
  } catch (error) {
    logger.error("GET Service File Download " + error);
    return res.send({ state: "Fail" });
  }
});

module.exports = router;
