const express = require("express");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const { pool } = require("../utils/mysql");
const { logger } = require("../utils/winston");
const { service_upload } = require("../utils/multer");
const { nameParser } = require("../utils/nameParser");
const { verifyToken } = require("../utils/jwt");

const router = express.Router();

/*----------------------------------------------------------------------*
 * POST Service Notice Detail
 * Example URL = ../service
 *----------------------------------------------------------------------*/
router.post(
  "/service",
  verifyToken,
  service_upload.single("service_notice_image"),
  async (req, res) => {
    const { hospital_id, title, context, fixed, attachment } = req.body;
    if (hospital_id != 24) {
      logger.info("POST Service Notice");
      return res.json({ state: "Fail", Message: "사이트 관리자만 접근 가능합니다." });
    }
    const rename =
      new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, "") +
      attachment;

    try {
      let a;
      if (req.body.attachment) {
        nameParser("uploads/service", "uploads/service", attachment, rename);
        const sql = `INSERT INTO service_notice ( 
                        title, 
                        context, 
                        fixed, 
                        attachment,
                        created_at) VALUES(?, ?, ?, ?, now());`;
        const data = await pool.query(sql, [title, context, fixed, rename]);
      } else {
        const sql = `INSERT INTO service_notice ( 
                        title, 
                        context, 
                        fixed,
                        created_at) VALUES(?, ?, ?, now());`;
        const data = await pool.query(sql, [title, context, fixed]);
      }
      const LAST_INSERT_ID = `SELECT MAX(id) as auto_id FROM service_notice;`;
      const data_id = await pool.query(LAST_INSERT_ID);
      const create_id = data_id[0][0].auto_id;
      logger.info("POST Service Notice");
      return res.json({ state: "Success", id: create_id });
    } catch (error) {
      logger.error("POST Service Notice " + error);
      return res.json({ state: "Fail" });
    }
  }
);

/*----------------------------------------------------------------------*
 * PUT Service Notice Detail
 * Example URL = ../service/1
 *----------------------------------------------------------------------*/
router.put(
  "/service/:id",
  verifyToken,
  service_upload.single("service_notice_image"),
  async (req, res) => {
    const id = req.params.id;
    const { hospital_id, title, context, fixed, attachment } = req.body;
    if (hospital_id != 24) {
      logger.info("POST Service Notice");
      return res.json({ state: "Fail", Message: "사이트 관리자만 접근 가능합니다." });
    }
    const rename =
      new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, "") +
      attachment;
    // const path = "uploads/service/" + rename;

    try {
      if (attachment != "null") {
        nameParser("uploads/service", "uploads/service", attachment, rename);
        const sql = `UPDATE service_notice SET 
                      title=?, 
                      context=?, 
                      fixed=?, 
                      attachment=?,
                      updated_at = now() WHERE id=?;`;
        const data = await pool.query(sql, [title, context, fixed, rename, id]);
      } else {
        const sql = `UPDATE service_notice SET 
                      title=?, 
                      context=?, 
                      fixed=?,
                      attachment = null,
                      updated_at = now() WHERE id=?;`;
        const data = await pool.query(sql, [title, context, fixed, id]);
      }

      logger.info("PUT Service Notice");
      return res.json({ result: "Success" });
    } catch (error) {
      logger.error("PUT Service Notice" + error);
      return res.json(error);
    }
  }
);

/*----------------------------------------------------------------------*
 * DELETE Service Notice Detail
 * Example URL = ../service/1
 *----------------------------------------------------------------------*/
router.delete("/service/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const { hospital_id } = req.body;
  if (hospital_id != 24) {
    logger.info("POST Service Notice");
    return res.json({ state: "Fail", Message: "사이트 관리자만 접근 가능합니다." });
  }
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
    const sql = `SELECT *
    ,(SELECT id FROM service_notice WHERE id < ? ORDER BY id DESC LIMIT 1) AS prev_id
    ,(SELECT title FROM service_notice WHERE id < ? ORDER BY id DESC LIMIT 1) AS prev_title
    ,(SELECT id FROM service_notice WHERE id > ? ORDER BY id LIMIT 1) AS next_id
    ,(SELECT title FROM service_notice WHERE id > ? ORDER BY id LIMIT 1) AS next_title
    FROM service_notice WHERE ID = ?;`;
    const data = await pool.query(sql, [id, id, id, id, id]);
    let result = data[0][0];
    if (result.attachment)
      result.image = "http://i6a205.p.ssafy.io:8000/api/serviceimage/" + result.attachment;
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
router.get("/service", async (req, res) => {
  try {
    // front에서 필요한 부분만 보내도록 쿼리 수정가능

    const sql = `SELECT * FROM service_notice order by fixed desc, created_at desc;`;
    const data = await pool.query(sql);
    const result = data[0];

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
