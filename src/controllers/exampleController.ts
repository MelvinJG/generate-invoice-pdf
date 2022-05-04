import { Request, Response } from 'express';
import Pool from '../databaseConexion';

class exampleController{
    public index(req: Request, res: Response){
        res.json({
            "Code": "200",
            "Status": "OPERATION_SUCCESSFUL",
            "Data": {
                "Request": "Test Successful"
            }
        });
    }

    public async testDB(req: Request, res: Response){
        try{
            const responseDB = await Pool.promise().query('SELECT * FROM t_Example');
            res.json({
                "Code": "200",
                "Status": "OPERATION_SUCCESSFUL",
                "data": responseDB[0]
            });
        }
        catch(err){
            res.json({
                "Code": "500",
                "Status": "INTERNAL_ERROR",
                "Error": {
                    err
                }
            });
        }
    }
}

export const ExampleController = new exampleController();