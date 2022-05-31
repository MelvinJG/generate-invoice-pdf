import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
// const exphbs = require('express-handlebars');
//import { engine } from 'express-handlebars';
const expressHbs = require('express-handlebars');
var webshot = require('webshot');

import exampleRoutes from './routes/exampleRoutes';
import invoiceRoute from './routes/invoiceRoute';
import viewInvoiceRoute from './routes/viewInvoiceRoute';
require('dotenv').config();

class Server {
    public app: Application

    constructor(){
        this.app = express();
        this.config();
        this.route();
    }

    config(): void{
        this.app.set('port', process.env.PORT);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));

        this.app.engine('hbs', expressHbs.engine({
            defaultLayout: 'main',
            extname: '.hbs',
            helpers: {
                getShortComment(comment: any) {
                    if (comment.length < 64) {
                        return comment;
                    }
                    return comment.substring(0, 64) + '...';
                }
            }
        }));
        this.app.set('view engine', 'hbs');
    }

    route(): void{ 
        this.app.use("/",exampleRoutes);
        this.app.use("/Factura",invoiceRoute);
        this.app.use("/viewFactura",viewInvoiceRoute);
    }


    


    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('ESCUCHANDO EN EL PUERTO ', this.app.get('port'));
        });
    }
}

const Servidor = new Server();
Servidor.start();