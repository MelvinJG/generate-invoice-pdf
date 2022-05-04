"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
exports.default = {
    database: {
        host: process.env.HOSTNAME,
        user: /*process.env.USERNAME || */ 'root',
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
};
