import { Request, Response } from 'express';

import Pool from '../databaseConexion';

class viewInvoiceController{
    async genereateViewInvoice(req: Request, res: Response){
        try{
            var registro = await Pool.promise().query('SELECT file_json FROM t_myJSON ORDER BY id DESC LIMIT 1');
            var json = JSON.stringify(registro[0]);
            var BODY = JSON.parse(JSON.parse(json)[0].file_json)
            res.render('home', {
                posts: [BODY]
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

export const ViewInvoiceController = new viewInvoiceController();