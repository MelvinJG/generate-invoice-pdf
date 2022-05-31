"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// const exphbs = require('express-handlebars');
//import { engine } from 'express-handlebars';
const expressHbs = require('express-handlebars');
var webshot = require('webshot');
const exampleRoutes_1 = __importDefault(require("./routes/exampleRoutes"));
const invoiceRoute_1 = __importDefault(require("./routes/invoiceRoute"));
const viewInvoiceRoute_1 = __importDefault(require("./routes/viewInvoiceRoute"));
require('dotenv').config();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.route();
    }
    config() {
        this.app.set('port', process.env.PORT);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.engine('hbs', expressHbs.engine({
            defaultLayout: 'main',
            extname: '.hbs',
            helpers: {
                getShortComment(comment) {
                    if (comment.length < 64) {
                        return comment;
                    }
                    return comment.substring(0, 64) + '...';
                }
            }
        }));
        this.app.set('view engine', 'hbs');
    }
    route() {
        this.app.use("/", exampleRoutes_1.default);
        this.app.use("/Factura", invoiceRoute_1.default);
        this.app.use("/viewFactura", viewInvoiceRoute_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('ESCUCHANDO EN EL PUERTO ', this.app.get('port'));
        });
    }
}
const Servidor = new Server();
Servidor.start();
