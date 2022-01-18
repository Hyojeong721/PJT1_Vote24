const express = require('express');
const server = express();
const {pool} = require("./utils/mysql");

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.get('/', (req, res) => {
    res.send("hello world");
})

server.post('/put', async (req, res) => {
    console.log(req.body);
    const params = req.body;
    try{
        const data = await pool.query('INSERT INTO hospital_info SET ?', params);
        return res.json({result: 'ok'});
    }
    catch(error){
        console.log("Error!!", error);
        return res.json(error);
    }
})

server.listen(80, function() {
    console.log('Server open port 80');
});