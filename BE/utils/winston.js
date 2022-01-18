const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

const logDir = 'log';
const {combine, timestamp, printf} = winston.format;

const logFormat = printf(info =>{
    return `${info.timestamp} ${info.level} ${info.message}`;
});

const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),
    transports:[
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/info',
            filename: `%DATE%.info.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),

        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});

if(process.env.NODE_ENV !== 'production'){
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
        )
    }));
}

module.exports = {logger};
