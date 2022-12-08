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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserBusiness_1 = require("../business/UserBusiness");
class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = "Success!";
                const input = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                };
                const userBusiness = new UserBusiness_1.UserBusiness();
                const token = yield userBusiness.signup(input);
                res.status(201).send({ message, token });
            }
            catch (error) {
                res.statusCode = 400;
                let message = error.sqlMessage || error.message;
                res.send({ message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = "Success!";
                const input = {
                    email: req.body.email,
                    password: req.body.password
                };
                const token = yield new UserBusiness_1.UserBusiness().login(input);
                res.status(200).send({ message, token });
            }
            catch (error) {
                let message = error.sqlMessage || error.message;
                res.statusCode = 400;
                res.send({ message });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map