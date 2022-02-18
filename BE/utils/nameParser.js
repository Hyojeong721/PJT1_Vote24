const fs = require('fs');
const {logger} = require('../utils/winston');

const nameParser = (originFilePath, destFilePath, originFileName, destFileName) => {
    fs.rename(`${originFilePath}/${originFileName}`, `${destFilePath}/${destFileName}`, (err) =>{
        if(err){
            logger.error("File Path Change Fail!! " + err);
        }
        else{
            logger.info("File Path Change Success!!");
        }
    });
}

module.exports = {nameParser};
