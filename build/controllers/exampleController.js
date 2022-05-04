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
exports.ExampleController = void 0;
const databaseConexion_1 = __importDefault(require("../databaseConexion"));
class exampleController {
    index(req, res) {
        res.json({
            "Code": "200",
            "Status": "OPERATION_SUCCESSFUL",
            "Data": {
                "Request": "Test Successful"
            }
        });
    }
    testDB(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const responseDB = yield databaseConexion_1.default.promise().query('SELECT * FROM t_Example');
                res.json({
                    "Code": "200",
                    "Status": "OPERATION_SUCCESSFUL",
                    "data": responseDB[0]
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
exports.ExampleController = new exampleController();
