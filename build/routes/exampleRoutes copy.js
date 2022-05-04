"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exampleController_1 = require("../controllers/exampleController");
class indexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', exampleController_1.ExampleController.index);
        this.router.get('/testDB', exampleController_1.ExampleController.testDB);
    }
}
const IndexRoutes = new indexRoutes();
exports.default = IndexRoutes.router;
