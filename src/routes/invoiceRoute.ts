import { Router } from 'express';

import { InvoiceController } from '../controllers/invoiceController';

class indexRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{        
        this.router.post('/generatePDF', InvoiceController.generatePDF);
        this.router.get('/exampleInvoice', InvoiceController.exampleInvoice);
    }
}

const IndexRoutes = new indexRoutes();
export default IndexRoutes.router;