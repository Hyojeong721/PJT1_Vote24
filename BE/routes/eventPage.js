const express = require("express");
const path = require("path");

const { pool } = require("../utils/mysql");
const { logger } = require("../utils/winston");
const { event_upload } = require("../utils/multer");
const { nameParser } = require("../utils/nameParser");
const { verifyToken } = require("../utils/jwt");

const router = express.Router();

/*----------------------------------------------------------------------*
 * GET Event List
 * Example URL = ../event/947780?page=1
 *----------------------------------------------------------------------*/
router.get("/event/:hospital_id", async (req, res) => {
  try {
    const hospital_id = req.params.hospital_id;
    //const { filter } = req.query;

    const sql = `select 
                        id,
                        created_at,
                        title,
                        start_at,
                        end_at,
                        views
                        from hospital_event where hospital_id =? order by end_at desc, created_at desc`;

    const data = await pool.query(sql, [hospital_id]);
    const result = data[0];
    const now = new Date();
    for (i = 0; i < result.length; i++) {
      if (now < result[i].start_at) result[i].status = 1;
      else result[i].status = now < result[i].end_at ? 0 : 2;
    }

    logger.info("GET Event List");
    return res.json(result);
  } catch (error) {
    logger.error("GET Event List " + error);
    return res.json({ status: "Fail" });
  }
});

/*----------------------------------------------------------------------*
 * GET Event Detail
 * Example URL = ../event/947780/1
 *----------------------------------------------------------------------*/
router.get("/event/:hospital_id/:id", async (req, res) => {
  try {
    const { hospital_id, id } = req.params;
    const sqlInc = `UPDATE hospital_event SET views = views+1 WHERE id = ?;`;
    await pool.query(sqlInc, [id]);
    await pool.query(sqlInc, [id]);
    const sql = `SELECT *
    ,(SELECT id FROM hospital_event WHERE hospital_id =? and id < ? ORDER BY id DESC LIMIT 1) AS prev_id
    ,(SELECT title FROM hospital_event WHERE hospital_id =? and id < ? ORDER BY id DESC LIMIT 1) AS prev_title
    ,(SELECT id FROM hospital_event WHERE hospital_id =? and id > ? ORDER BY id LIMIT 1) AS next_id
    ,(SELECT title FROM hospital_event WHERE hospital_id =? and id > ? ORDER BY id LIMIT 1) AS next_title
    FROM hospital_event WHERE hospital_id =? and id=?`;
    const data = await pool.query(sql, [
      hospital_id,
      id,
      hospital_id,
      id,
      hospital_id,
      id,
      hospital_id,
      id,
      hospital_id,
      id,
    ]);
    let result = data[0][0];
    if (result.attachment)
      result.image = "http://i6a205.p.ssafy.io:8000/api/eventimage/" + result.attachment;

    logger.info("GET Event Detail");
    return res.json(result);
  } catch (error) {
    logger.error("GET Event Detail " + error);
    return res.json({ status: "Fail" });
  }
});

/*----------------------------------------------------------------------*
 * POST Event Detail
 * Example URL = ../event/947780/1
 *----------------------------------------------------------------------*/
router.post(
  "/event/:hospital_id",
  verifyToken,
  event_upload.single("event_img"),
  async (req, res) => {
    const { hospital_id } = req.params;

    const { title, end_at, start_at, context, attachment } = req.body;

    try {
      if (attachment) {
        const rename =
          new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, "") +
          attachment;
        // const path = "uploads/event/" + rename;
        nameParser("uploads/event", "uploads/event", attachment, rename);

        const sql = `insert into hospital_event (
                            hospital_id, 
                            title, 
                            context, 
                            start_at, 
                            end_at, 
                            attachment,
                            created_at) value(?,?,?,?,?,?, now())`;
        const data = await pool.query(sql, [hospital_id, title, context, start_at, end_at, rename]);
      } else {
        const sql = `insert into hospital_event (
                hospital_id, 
                title, 
                context, 
                start_at, 
                end_at,
                created_at) value(?,?,?,?,?, now())`;
        const data = await pool.query(sql, [hospital_id, title, context, start_at, end_at]);
      }
      const LAST_INSERT_ID = `SELECT MAX(id) as auto_id FROM hospital_event;`;
      const data_id = await pool.query(LAST_INSERT_ID);
      const create_id = data_id[0][0].auto_id;
      logger.info("POST Event Detail");
      return res.json({ state: "Success", id: create_id });
    } catch (error) {
      logger.error("POST Event Detail" + error);
      return res.json(error);
    }
  }
);

/*----------------------------------------------------------------------*
 * DELETE Event Detail
 * Example URL = ../event/947780/1
 *----------------------------------------------------------------------*/
router.delete("/event/:hospital_id/:id", verifyToken, async (req, res) => {
  try {
    const { hospital_id, id } = req.params;

    const sql = `DELETE FROM hospital_event WHERE hospital_id =? AND id =?`;
    const data = await pool.query(sql, [hospital_id, id]);

    logger.info("DELETE Event Detail");
    return res.json({ status: "Success" });
  } catch (error) {
    logger.error("DELETE Event Detail " + error);
    return res.json({ state: "Fail" });
  }
});

/*----------------------------------------------------------------------*
 * UPDATE Event Detail
 * Example URL = ../event/list/947780/1
 *----------------------------------------------------------------------*/
router.put(
  "/event/:hospital_id/:id",
  verifyToken,
  event_upload.single("event_img"),
  async (req, res) => {
    const { hospital_id, id } = req.params;

    const { title, end_at, start_at, context, attachment } = req.body;

    try {
      if (attachment != "null") {
        const rename =
          new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, "") +
          attachment;
        // const path = "uploads/event/" + rename;
        nameParser("uploads/event", "uploads/event", attachment, rename);

        const sql = `update hospital_event set
                            title =?, 
                            context =?, 
                            start_at =?, 
                            end_at =?, 
                            attachment =?,
                            updated_at = now() where id=? AND hospital_id=?`;
        const data = await pool.query(sql, [
          title,
          context,
          start_at,
          end_at,
          rename,
          id,
          hospital_id,
        ]);
      } else {
        const sql = `update hospital_event set
                            title =?, 
                            context =?, 
                            start_at =?, 
                            end_at =?,
                            attachment = null,
                            updated_at = now() where id=? AND hospital_id=?`;
        const data = await pool.query(sql, [title, context, start_at, end_at, id, hospital_id]);
      }

      logger.info("UPDATE Event Detail");
      return res.json({ state: "Success" });
    } catch (error) {
      logger.error("UPDATE Event Detail " + error);
      return res.json(error);
    }
  }
);

/*----------------------------------------------------------------------*
 * GET Event File Detail
 * Example URL = ../event/947780/3/download
 *----------------------------------------------------------------------*/
router.get("/event/:hospital_id/:id/download", async (req, res) => {
  const { hospital_id, id } = req.params;

  try {
    const sql = `SELECT attachment FROM hospital_event WHERE hospital_id =? AND id=?`;
    const data = await pool.query(sql, [hospital_id, id]);
    const filepath = data[0][0].attachment;

    logger.info("GET File Detail");
    return res.download(path.join(__dirname, filepath));
  } catch (error) {
    logger.error("GET File Detail " + error);
    return res.json({ state: "Fail" });
  }
});

module.exports = router;
