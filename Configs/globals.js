global.chalk = require('chalk'); // FOR COLORED CONSOLES

global.STATUS_CODES = require('./constants').STATUS_CODES;

//DB CONNECTION
global.sequelize = require('./database').sequelize;

const { Op } = require('sequelize');

global.Op = Op;
