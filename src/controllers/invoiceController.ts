import { Request, Response } from 'express';
import Pool from '../databaseConexion';
var webshot = require('webshot');
const fs = require('fs')
const pdf2base64 = require('pdf-to-base64');


class invoiceController{

    async generatePDF(req: Request, res: Response){
        try{
            /* Inserta en base de datos para el PDF */
            var elJSON = {
                file_json: JSON.stringify(req.body)
            }
            await Pool.promise().query('INSERT INTO t_myJSON SET?',[elJSON]);
            



            /* Genera el PDF */
            let promise = new Promise(function(resolve, reject) {
                var options = { 
                    screenSize: { 
                        width: 1920, 
                        height: 1080 
                    }, 
                    shotSize: { 
                        width: 1920, 
                        height: 'all' 
                    }, 
                    paperSize: {
                        width: '780px', 
                        height: '1080px'
                    } 
                };
                webshot('http://localhost:1500/viewFactura/generateViewPDF', 'Factura.pdf', options, function(err: any) {   
                    if (!err) {
                        console.log('MI PDF');
                        resolve({});
                        /* Eliminar PDF */
                        // try {
                        //     fs.unlinkSync('Factura.pdf')
                        //     console.log('File removed')
                        // } catch(err) {
                        //     console.error('Something wrong happened removing the file', err)
                        // }
                    }else{
                        reject();
                    }
                });
            });

            /** PDF A BASE64 */
            promise.then(() => {
                pdf2base64("Factura.pdf").then((response: any) => {
                    res.json({
                        "Code": "200",
                        "Status": "OPERATION_SUCCESSFUL",
                        "pdfResponse": response
                    });
                    /* Eliminar PDF */
                        // try {
                        //     fs.unlinkSync('Factura.pdf')
                        //     console.log('File removed')
                        // } catch(err) {
                        //     console.error('Something wrong happened removing the file', err)
                        // }
                }).catch((error: any) => {
                    res.json({
                        "Code": "500",
                        "Status": "PDF_ERROR",
                        "pdfResponse": error
                    });
                })
            })

            
            /* Eliminar PDF */
            // fs.unlink('./Factura.pdf').then(() => {
            //     console.log('File removed')
            // }).catch((err: any) => {
            //     console.error('Something wrong happened removing the file', err)
            // })
        }
        catch(err){
            console.log(err);
            res.json({
                "Code": "500",
                "Status": "INTERNAL_ERROR",
                "Error": {
                    err
                }
            });
        }
    }

    async exampleInvoice(req: Request, res: Response){
        try{
            console.log("BODY DE POST ",req)
            res.render('home', {
                posts: [
                    {
                        codigo_Tienda: 1,
                        direccion_Tienda: "Sumpango Sac",
                        nombre_Tienda: "Proyecto Final IdS",
                        image: 'https://m.media-amazon.com/images/I/51cUkM6AmzL._AC_SL1000_.jpg',
                        dpi_Cliente: "1234567890",
                        nombre_Cliente: "Nombre Nombre Apellido Apellido",
                        nit_Cliente: "1234456",
                        productos: [ 
                            {
                                nombre_Producto: "Producto1",
                                precio: 35.50,
                                cantidad_Comprada: 3,
                                sub_Total: 91.50
                            },
                            {
                                nombre_Producto: "Producto2",
                                precio: 5.50,
                                cantidad_Comprada: 3,
                                sub_Total: 16.50
                            }
                        ],
                        total_A_Pagar: 108.00,
                    }
                ]
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

export const InvoiceController = new invoiceController();