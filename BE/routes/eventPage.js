const express = require("express");
const path = require("path");

const { pool } = require("../utils/mysql");
const { logger } = require("../utils/winston");
const { event_upload } = require("../utils/multer");
const { nameParser } = require("../utils/nameParser");

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
                        from hospital_event where hospital_id =?`;

    const data = await pool.query(sql, [hospital_id]);
    const result = data[0];

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
    const sql = `select * from hospital_event where hospital_id =? and id=?`;
    const data = await pool.query(sql, [hospital_id, id]);
    let result = data[0];
    result[0].image = "http://localhost/api/eventimage/" + result.attachment;

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
router.post("/event/:hospital_id", event_upload.single("event_img"), async (req, res) => {
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
                            attachment) value(?,?,?,?,?,?)`;
      const data = await pool.query(sql, [hospital_id, title, context, start_at, end_at, rename]);
    } else {
      const sql = `insert into hospital_event (
                hospital_id, 
                title, 
                context, 
                start_at, 
                end_at) value(?,?,?,?,?)`;
      const data = await pool.query(sql, [hospital_id, title, context, start_at, end_at]);
    }
    const LAST_INSERT_ID = `SELECT LAST_INSERT_ID() as auto_id;`;
    const data_id = await pool.query(LAST_INSERT_ID);
    const create_id = data_id[0][0].auto_id;
    logger.info("POST Event Detail");
    return res.json({ state: "Success", id: create_id });
  } catch (error) {
    logger.error("POST Event Detail" + error);
    return res.json(error);
  }
});

/*----------------------------------------------------------------------*
 * DELETE Event Detail
 * Example URL = ../event/947780/1
 *----------------------------------------------------------------------*/
router.delete("/event/:hospital_id/:id", async (req, res) => {
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
router.put("/event/:hospital_id/:id", event_upload.single("event_image"), async (req, res) => {
  const { hospital_id, id } = req.params;

  const { title, end_at, start_at, context, attachment } = req.body;

  try {
    if (attachment) {
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
                            attachment =? where id=? AND hospital_id`;
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
                            end_at =? where id=? AND hospital_id`;
      const data = await pool.query(sql, [
        title,
        context,
        start_at,
        end_at,
        attachment,
        id,
        hospital_id,
      ]);
    }

    logger.info("UPDATE Event Detail");
    return res.json({ state: "Success" });
  } catch (error) {
    logger.error("UPDATE Event Detail " + error);
    return res.json(error);
  }
});

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
