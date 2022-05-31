"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const invoiceController_1 = require("../controllers/invoiceController");
class indexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/generatePDF', invoiceController_1.InvoiceController.generatePDF);
        this.router.get('/exampleInvoice', invoiceController_1.InvoiceController.exampleInvoice);
    }
}
const IndexRoutes = new indexRoutes();
exports.default = IndexRoutes.router;
