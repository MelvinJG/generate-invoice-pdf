"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceController = void 0;
const databaseConexion_1 = __importDefault(require("../databaseConexion"));
var webshot = require('webshot');
const fs = require('fs');
const pdf2base64 = require('pdf-to-base64');
class invoiceController {
    generatePDF(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /* Inserta en base de datos para el PDF */
                var elJSON = {
                    file_json: JSON.stringify(req.body)
                };
                yield databaseConexion_1.default.promise().query('INSERT INTO t_myJSON SET?', [elJSON]);
                /* Genera el PDF */
                let promise = new Promise(function (resolve, reject) {
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
                    webshot('http://localhost:1500/viewFactura/generateViewPDF', 'Factura.pdf', options, function (err) {
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
                        }
                        else {
                            reject();
                        }
                    });
                });
                /** PDF A BASE64 */
                promise.then(() => {
                    pdf2base64("Factura.pdf").then((response) => {
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
                    }).catch((error) => {
                        res.json({
                            "Code": "500",
                            "Status": "PDF_ERROR",
                            "pdfResponse": error
                        });
                    });
                });
                /* Eliminar PDF */
                // fs.unlink('./Factura.pdf').then(() => {
                //     console.log('File removed')
                // }).catch((err: any) => {
                //     console.error('Something wrong happened removing the file', err)
                // })
            }
            catch (err) {
                console.log(err);
                res.json({
                    "Code": "500",
                    "Status": "INTERNAL_ERROR",
                    "Error": {
                        err
                    }
                });
            }
        });
    }
    exampleInvoice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("BODY DE POST ", req);
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
            catch (err) {
                res.json({
                    "Code": "500",
                    "Status": "INTERNAL_ERROR",
                    "Error": {
                        err
                    }
                });
            }
        });
    }
}
exports.InvoiceController = new invoiceController();
