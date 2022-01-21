const express = require('express');
const path = require('path');

const { pool } = require('../utils/mysql');
const { logger } = require('../utils/winston');
const { notice_upload } = require('../utils/multer');
const { nameParser } = require('../utils/nameParser');

const router = express.Router();

/*----------------------------------------------------------------------*
 * GET Notice List
 * Example URL = ../notice/947780?page=1
 *----------------------------------------------------------------------*/
router.get('/notice/:hospital_id', async (req, res) => {
    try {
        const hospital_id = req.params.hospital_id;
        const { page } = req.query;
        console.log(typeof(hospital_id));
        const sql = `select 
                        created_at, 
                        title, 
                        views 
                        from hospital_notice where hospital_id =?`

        const data = await pool.query(sql, [hospital_id]);
        const result = data[0].slice(((page-1) * 10), (page * 10));
        
        logger.info('GET Notice List');
        return res.json(result);
    }
    catch(error){
        logger.error('GET Notice List Fail ' + error);
        return res.json({state:'Fail'});
    }
});

/*----------------------------------------------------------------------*
 * GET Notice Detail
 * Example URL = ../notice/947780/1
 *----------------------------------------------------------------------*/
router.get("/notice/:hospital_id/:id", async (req, res) => {
    try {
        const {
            hospital_id,
            id
        } = req.params;
        
        const sql = `select * from hospital_notice where hospital_id =? and id=?`
        const data = await pool.query(sql, [hospital_id, id]);
        const result = data[0];

        logger.info('GET Notice Detail');
        return res.json(result);
    }   
    catch(error){
        logger.error('GET Notice Detail ' + error);
        return res.json({state:'Fail'});
    }
});

/*----------------------------------------------------------------------*
 * POST Notice Detail
 * Example URL = ../notice/947780
 *----------------------------------------------------------------------*/
router.post('/notice/:hospital_id', notice_upload.single('notice_image'), async (req, res) => {
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
        const path = 'uploads/notice/' + rename;
        nameParser("uploads/notice", "uploads/notice", attachment, rename);

        const sql = `insert into hospital_notice (
                        hospital_id, 
                        title, 
                        context, 
                        start_at, 
                        end_at, 
                        attachment) value(?,?,?,?,?,?)`;
        const data = await pool.query(sql, [hospital_id, title, context, start_at, end_at, path]);

        logger.info('POST Notice Detail');
        return res.json({state:'Success'});
    }
    catch(error){
        logger.error('POST Notice Detail ' + error);
        return res.json({state:'Fail'});
    }
});

/*----------------------------------------------------------------------*
 * DELETE Notice Detail
 * Example URL = ../notice/947780/1
 *----------------------------------------------------------------------*/
router.delete("/notice/:hospital_id/:id", async (req, res) => {
    try {
        const { 
            hospital_id, 
            id 
        } = req.params;

        const sql = `DELETE FROM hospital_notice WHERE hospital_id =? AND id =?`
        const data = await pool.query(sql, [hospital_id, id]);

        logger.info("DELETE Notice Detail ")
        return res.json({status:'Success'});
    }
    catch(error){
        logger.error('DELETE Notice Detail ' + error);
        return res.json({state:'Fail'});
    }
});

/*----------------------------------------------------------------------*
 * UPDATE Notice Detail
 * Example URL = ../notice/947780/1
 *----------------------------------------------------------------------*/
router.put('/notice/:hospital_id/:id', notice_upload.single('notice_image'),async (req, res) => {
    const {
        hospital_id,
        id 
    }= req.query;

    const {
        title,
        end_at,
        start_at,
        context,
        attachment
    } = req.body;

    const rename = Date() + attachment;
    const path = 'uploads/notice/' + rename;
    nameParser("uploads/notice", "uploads/notice", attachment, rename);

    try {
        const sql = `update hospital_notice set
            title =?, 
            context =?, 
            start_at =?, 
            end_at =?, 
            attachment =? where id=? AND hospital_id`;
        const data = await pool.query(sql, [title, context, start_at, end_at, attachment, id, hospital_id]);

        logger.info('UPDATE Notice Detail');
        return res.json({state:'Success'});
    }
    catch(error){
        logger.error('UPDATE Notice Detail ' + error);
        return res.json({state:'Fail'});
    }    
});

/*----------------------------------------------------------------------*
 * GET File Download
 * Example URL = ../notice/947780/3/download
 *----------------------------------------------------------------------*/
router.get("/notice/:hospital_id/:id/download", async (req, res) => {
    const {
        hospital_id,
        id
    } = req.params;

    try {  
        const sql = `SELECT attachment FROM hospital_notice WHERE hospital_id =? AND id=?`;
        const data = await pool.query(sql, [hospital_id, id]);
        const filepath = data[0][0].attachment;

        logger.info('GET File Download');
        return res.download(path.join(__dirname, filepath));
    }
    catch(error){
        logger.error('GET File Download ' + error);
        return res.json({state: 'Fail'});
    }
})

module.exports = router;
