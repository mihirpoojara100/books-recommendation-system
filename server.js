// PARSE .ENV
require('dotenv').config();
// FOR SERVER
const http = require('http');

const express = require('express'); // NODE FRAMEWORK
const bodyParser = require('body-parser'); // TO PARSE POST REQUEST
const cors = require('cors'); // ALLOW CROSS ORIGIN REQUESTS
const fs = require('fs');

// ---------------------------    SERVER CONFIGS ----------------------------------
const port = process.env.PORT || 9000;
const app = express();
const server = http.createServer(app);

// GLOBAL SETTINGS FILES
require('./Configs/globals');

// --------------------------   LANGUAGE    ----------------------------------------
// Define unique Key - pair in Locales / Messages.js
// It will add entry in respective json files
/* By default language is set to english  User can change by  passing  language in
	Header :
	Accept-Language : 'en'
	Query : 
	url?lang=en
*/
const language = require('i18n');
language.configure({
    locales: ['en'],
    defaultLocale: 'en',
    autoReload: true,
    directory: __dirname + '/Locales',
    queryParameter: 'lang',
    objectNotation: true,
    syncFiles: true,
});

// ------------------------      GLOBAL MIDDLEWARE -------------------------
app.use(bodyParser.json()); // ALLOW APPLICATION JSON
app.use(bodyParser.urlencoded({ extended: false })); // ALLOW URL ENCODED PARSER
app.use(cors()); // ALLOWED ALL CROSS ORIGIN REQUESTS
app.use(express.static(__dirname + '/Assets')); // SERVE STATIC IMAGES FROM ASSETS FOLDER
app.use(express.static(__dirname + '/Logs')); // SERVE STATIC IMAGES FROM ASSETS FOLDER
app.use(language.init); // MULTILINGUAL SETUP

// ------------------------    RESPONSE HANDLER    -------------------
app.use((req, res, next) => {
    const ResponseHandler = require('./Configs/responseHandler');
    res.handler = new ResponseHandler(req, res);
    next();
});

// --------------------------    ROUTES    ------------------
const appRoutes = require('./Routes');
const chalk = require('chalk');
appRoutes(app);

// --------------------------    GLOBAL ERROR HANDLER    ------------------
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.handler.serverError(err);
});

// --------------------------    START SERVER    ---------------------
server.listen(port, () => {
    console.log(
        chalk.cyanBright.bold(
            `\nServer started on ${chalk.white.bold(port)} :) \n`
        )
    );
});

// ------------------------    OVERWRITE LOG FUNCTION TO WRITE CONSOLE.LOG IN LOG FILE    -------------------

if (process.env.SAVE_LOG === 'true') {
    let path = require('path');
    let moment = require('moment');
    let logDirectory = path.join(__dirname, './Logs');
    let rfs = require('rotating-file-stream');

    try {
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
        accessLogStream = rfs.createStream(
            moment(new Date()).format('DD-MM-YYYY') + '.log',
            {
                interval: '21d', // rotate daily
                path: logDirectory,
            }
        );
    } catch (err) {
        // Handle the error here.
        console.log(err);
    }

    let util = require('util');
    let log_stdout = process.stdout;

    console.log = function () {
        let filePath =
            __dirname +
            '/Logs/' +
            moment(new Date()).format('DD-MM-YYYY') +
            '.log';

        if (fs.existsSync(logDirectory)) {
            if (!fs.existsSync(filePath)) {
                rfs.createStream(filePath);
            }
        } else {
            fs.mkdirSync(logDirectory);
        }

        setTimeout(() => {
            let log_file = fs.createWriteStream(filePath, { flags: 'a' });

            log_file.write(
                'CONSOLE.LOG : ' + util.format.apply(null, arguments) + '\n'
            );
            log_stdout.write(util.format.apply(null, arguments) + '\n');
        }, 100);
    };
}
