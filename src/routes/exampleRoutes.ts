import { Router } from 'express';

import { ExampleController } from '../controllers/exampleController';

class indexRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{        
        this.router.get('/', ExampleController.index);
        this.router.get('/testDB', ExampleController.testDB);
    }
}

const IndexRoutes = new indexRoutes();
export default IndexRoutes.router;