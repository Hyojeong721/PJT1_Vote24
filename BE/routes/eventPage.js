const express = require('express');
const path = require('path');

const { pool } = require('../utils/mysql');
const { logger } = require('../utils/winston');
const { event_upload } = require('../utils/multer');
const { nameParser } = require('../utils/nameParser');

const router = express.Router();

/*----------------------------------------------------------------------*
 * Get event list from Server
 * Example URL = ../event/list/947780?page=1
 *----------------------------------------------------------------------*/
router.get('/event/:hospital_id', async (req, res) => {
    try { 
        const hospital_id = req.params.hospital_id;
        const { page } = req.query;

        const data = await pool.query("select * from hospital_event where hospital_id =?", [hospital_id]);  
        const result = data[0].slice(((page-1) * 10), (page * 10));
        logger.info('GET /event/:hosptial_id?page=n');
        return res.json(result);
    }
    catch(error){
        logger.error('GET /event/:hosptial_id?page=n' + error);
        return res.json({status: "Fail"});
    }
});

/*----------------------------------------------------------------------*
 * Get event info from Server
 * Example URL = ../event/list/947780?id=1
 *----------------------------------------------------------------------*/
router.get("/event/:hospital_id/:id", async (req, res) => {
    try {
        const hospital_id = req.params.hospital_id;
        const id = req.params.id;
                
        const data = await pool.query("select * from hospital_event where hospital_id =? and id=?", [hospital_id, id]);
        const result = data[0];
aa
        logger.info('GET /event/:hosptial_id?id=n');
        return res.json(result);
    }   
    catch(error){
        logger.error('GET /event/:hosptial_id?id=n' + error);
        return res.json({status: 404});
    }
});

/*----------------------------------------------------------------------*
 * POST event info to Server
 * Example URL = ../event/list/947780
 *----------------------------------------------------------------------*/
router.post('/event/:hospital_id', event_upload.single('event_img'),async (req, res) => {
    try {
        const hospital_id = req.params.hospital_id;
        const {
            title,
            end_at,
            start_at,
            context,
            attachment
        } = req.body;

        const rename = Date() + attachment;
        const path = 'uploads/event/' + rename;

        nameParser("uploads/event", "uploads/event", attachment, rename);

        const sql = `insert into hospital_event (
                        hospital_id, 
                        title, 
                        context, 
                        start_at, 
                        end_at, 
                        attachment) value(?,?,?,?,?,?)`;
        const data = await pool.query(sql, [hospital_id, title, context, start_at, end_at, path]);

        logger.info('POST /event/create/');
        return res.json({state:'Success'});
    }
    catch(error){
        logger.error('POST error' + error);
        return res.json({state:'Fail'});
    }
});

/*----------------------------------------------------------------------*
 * Delete event info from Server
 * Example URL = ../event/list/947780?id=1
 *----------------------------------------------------------------------*/
router.delete("/event/:hospital_id/:id", async (req, res) => {
    try {
        const hospital_id = req.params.hospital_id;
        const id = req.params.id;
        const sql = `DELETE FROM hospital_event WHERE hospital_id =? AND id =?`
        const data = await pool.query(sql, [hospital_id, id]);
        console.log(id);
        logger.info("DELETE /event/update/:hospital_id")
        return res.json({status:'Success'});
    }
    catch(error){
        logger.error('DELETE error' + error);
        return res.json({state:'Fail'});
    }
});

/*----------------------------------------------------------------------*
 * Update event info from Server
 * Example URL = ../event/list/947780?id=1
 *----------------------------------------------------------------------*/
router.put('/event/:hospital_id/:id', event_upload.single('event_image'),async (req, res) => {
    const hospital_id = req.params.hospital_id;
    const id = req.query;
    const {
        title,
        end_at,
        start_at,
        context,
        attachment
    } = req.body;

    const rename = Date() + attachment;
    const path = 'uploads/event/' + rename;

    nameParser("uploads/event", "uploads/event", attachment, rename);

    try {
        const sql = `update hospital_event set
            title =?, 
            context =?, 
            start_at =?, 
            end_at =?, 
            attachment =? where id=? AND hospital_id`;

            const data = await pool.query(sql, [title, context, start_at, end_at, attachment, id, hospital_id]);

        logger.info('PATCH /event/patch/:hospital_id');
        return res.json({state:'Success'});
    }
    catch(error){
        logger.error('PATCH error' + error);
        return res.json({state:'Fail'});
    }    
});

/*----------------------------------------------------------------------*
 * POST event info to Server
 * Example URL = ../event/list/947780
 *----------------------------------------------------------------------*/
router.get("/event/:hospital_id/:id/download", async (req, res) => {
    const hospital_id = req.params.hospital_id;
    const id = req.params.id;

    try {  
        const sql = `SELECT attachment FROM hospital_event WHERE hospital_id =? AND id=?`;
        const data = await pool.query(sql, [hospital_id, id]);
        const filepath = data[0][0].attachment;

        console.log(filepath);

        logger.info('GET /event/:hospital_id/:id/download Success');
        return res.download(path.join(__dirname, filepath));
    }
    catch(error){
        logger.error('GET Fail ' + error);
        return res.send("Fail");
    }
})

module.exports = router;
