import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import exampleRoutes from './routes/exampleRoutes';
import invoiceRoute from './routes/invoiceRoute';
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
    }

    route(): void{ 
        this.app.use("/",exampleRoutes);
        this.app.use("/Factura",invoiceRoute);
    }

    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('ESCUCHANDO EN EL PUERTO ', this.app.get('port'));
        });
    }
}

const Servidor = new Server();
Servidor.start();