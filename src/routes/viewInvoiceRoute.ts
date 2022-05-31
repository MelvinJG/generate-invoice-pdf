import { Router } from 'express';

import { ViewInvoiceController } from '../controllers/viewInvoiceController';
class indexRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{        
        this.router.get('/generateViewPDF', ViewInvoiceController.genereateViewInvoice);
    }
}

const IndexRoutes = new indexRoutes();
export default IndexRoutes.router;