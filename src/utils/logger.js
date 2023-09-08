import winston from 'winston';
import config from '../config/dotenv.config.js';

const logLevels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
};

const logColors = {
    debug: "white",
    http: "green",
    info: "blue",
    warning: "yellow",
    error: "red",
    fatal: "brown",
};

const devLogger = winston.createLogger({
    levels: logLevels,
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
    ),
    transports: [new winston.transports.Console({ level: "debug" })]
});

const prodLogger = winston.createLogger({
    levels: logLevels,
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple() 
    ),
    transports: [
        new winston.transports.Console({ level: "info" }),
        new winston.transports.File({ filename: "./error.log", level: "error" }),
    ],
});

export const addLogger = (req, res, next) => {
    switch (config.nodeEnv) {
        case 'development':
            req.logger = devLogger;
            break;
        case 'production':
            req.logger = prodLogger;
            break;
        default:
            req.logger = devLogger;
    }
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()} environment: ${config.nodeEnv}`)
    next();
};

export const loggerInfo = () => {
    switch (config.nodeEnv) {
        case 'development':
            return devLogger;
        case 'production':
            return prodLogger
        default:
            return devLogger
    }
}

winston.addColors(logColors);