const express = require('express');
const path = require('path');

const { pool } = require('../utils/mysql');
const { logger } = require('../utils/winston');
const { event_upload } = require('../utils/multer');
const { nameParser } = require('../utils/nameParser');

const router = express.Router();

/*----------------------------------------------------------------------*
 * GET Event List
 * Example URL = ../event/947780?page=1
 *----------------------------------------------------------------------*/
router.get('/event/:hospital_id', async (req, res) => {
    try { 
        const hospital_id = req.params.hospital_id;
        const { page } = req.query;
        console.log(typeof(hospital_id));
        const sql = `select 
                        created_at,
                        title,
                        start_at,
                        end_at,
                        views
                        from hospital_event where hospital_id =?`
        
        const data = await pool.query(sql, [hospital_id]);  
        const result = data[0].slice(((page-1) * 10), (page * 10));
        
        logger.info('GET Event List');
        return res.json(result);
    }
    catch(error){
        logger.error('GET Event List ' + error);
        return res.json({status: "Fail"});
    }
});

/*----------------------------------------------------------------------*
 * GET Event Detail
 * Example URL = ../event/947780/1
 *----------------------------------------------------------------------*/
router.get("/event/:hospital_id/:id", async (req, res) => {
    try {
        const {
            hospital_id,
            id
        } = req.params;

        const sql = `select * from hospital_event where hospital_id =? and id=?`;
        const data = await pool.query(sql, [hospital_id, id]);
        const result = data[0];

        logger.info('GET Event Detail');
        return res.json(result);
    }   
    catch(error){
        logger.error('GET Event Detail ' + error);
        return res.json({status: 'Fail'});
    }
});

/*----------------------------------------------------------------------*
 * POST Event Detail
 * Example URL = ../event/947780/1
 *----------------------------------------------------------------------*/
router.post('/event/:hospital_id', event_upload.single('event_img'),async (req, res) => {
    try {
        const {
             hospital_id
        } = req.params;
        
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

        logger.info('POST Event Detail');
        return res.json({state:'Success'});
    }
    catch(error){
        logger.error('POST Event Detail' + error);
        return res.json({state:'Fail'});
    }
});

/*----------------------------------------------------------------------*
 * DELETE Event Detail
 * Example URL = ../event/947780/1
 *----------------------------------------------------------------------*/
router.delete("/event/:hospital_id/:id", async (req, res) => {
    try {
        const {
            hospital_id,
            id
        } = req.params;

        const sql = `DELETE FROM hospital_event WHERE hospital_id =? AND id =?`
        const data = await pool.query(sql, [hospital_id, id]);
        
        logger.info("DELETE Event Detail")
        return res.json({status:'Success'});
    }
    catch(error){
        logger.error('DELETE Event Detail ' + error);
        return res.json({state:'Fail'});
    }
});

/*----------------------------------------------------------------------*
 * UPDATE Event Detail
 * Example URL = ../event/list/947780/1
 *----------------------------------------------------------------------*/
router.put('/event/:hospital_id/:id', event_upload.single('event_image'),async (req, res) => {
    const {
        hospital_id,
        id
    } = req.params;
    
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

        logger.info('UPDATE Event Detail');
        return res.json({state:'Success'});
    }
    catch(error){
        logger.error('UPDATE Event Detail ' + error);
        return res.json({state:'Fail'});
    }    
});

/*----------------------------------------------------------------------*
 * GET File Detail
 * Example URL = ../event/947780/3/download
 *----------------------------------------------------------------------*/
router.get("/event/:hospital_id/:id/download", async (req, res) => {
    const {
        hospital_id,
        id
    } = req.params;

    try {  
        const sql = `SELECT attachment FROM hospital_event WHERE hospital_id =? AND id=?`;
        const data = await pool.query(sql, [hospital_id, id]);
        const filepath = data[0][0].attachment;

        logger.info('GET File Detail');
        return res.download(path.join(__dirname, filepath));
    }
    catch(error){
        logger.error('GET File Detail ' + error);
        return res.json({state: 'Fail'});
    }
})

module.exports = router;
