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
const pdf2base64 = require('pdf-to-base64');
class invoiceController {
    generatePDF(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                yield databaseConexion_1.default.promise().query('INSERT INTO t_Registros SET?', [req.body]);
                pdf2base64("src/sample.pdf").then((response) => {
                    //pdf2base64("http://www.africau.edu/images/default/sample.pdf").then((response: any) => {
                    res.json({
                        "Code": "200",
                        "Status": "OPERATION_SUCCESSFUL",
                        "pdfResponse": response
                    });
                }).catch((error) => {
                    res.json({
                        "Code": "500",
                        "Status": "PDF_ERROR",
                        "pdfResponse": error
                    });
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
