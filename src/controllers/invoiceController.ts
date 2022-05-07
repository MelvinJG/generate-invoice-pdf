import { Request, Response } from 'express';
import Pool from '../databaseConexion';


const pdf2base64 = require('pdf-to-base64');

class invoiceController{

    public async generatePDF(req: Request, res: Response){
        try{
            console.log(req.body);
            await Pool.promise().query('INSERT INTO t_Registros SET?',[req.body]);
            pdf2base64("src/sample.pdf").then((response: any) => {
            //pdf2base64("http://www.africau.edu/images/default/sample.pdf").then((response: any) => {
                res.json({
                    "Code": "200",
                    "Status": "OPERATION_SUCCESSFUL",
                    "pdfResponse": response
                });
            }).catch((error: any) => {
                res.json({
                    "Code": "500",
                    "Status": "PDF_ERROR",
                    "pdfResponse": error
                });
            })
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

export const InvoiceController = new invoiceController();