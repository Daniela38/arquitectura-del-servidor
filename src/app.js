
import express from 'express';
import configureMiddlewares from './config/middlewares.config.js';
import configureMongo from './config/mongoDB.config.js';
import configureHandlebars from './config/handlebars.config.js';
import configureSwagger from './config/swagger.config.js';
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import path from'path';
import __dirname from './utils/utils.js';
import routes from './routes/index.js';
import config from './config/dotenv.config.js';
import configureSocket from './config/socket.config.js';
import { addLogger, loggerInfo } from './utils/logger.js';

const app = express();
app.use(addLogger);

configureMiddlewares(app);

configureMongo();

configureHandlebars(app);

configureSwagger(app);

initializePassport();
app.use(passport.initialize());

app.use('/files', express.static(path.join(__dirname + './public')));

routes(app);

//Server y Socket
const httpServer = app.listen(config.port, () => {
    const info = loggerInfo();
    info.info(`The server is listening on port ${config.port}`);
});
configureSocket(httpServer, app);