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
exports.UserBusiness = void 0;
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
const UserDatabase_1 = require("../data/UserDatabase");
const TokenManager_1 = require("../services/TokenManager");
class UserBusiness {
    signup(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.name || !input.email || !input.password) {
                    throw new Error('"name", "email" and "password" must be provided');
                }
                const idGenerator = new IdGenerator_1.IdGenerator();
                const id = idGenerator.generateId();
                const hashManager = new HashManager_1.HashManager();
                const cypherPassword = yield hashManager.hash(input.password);
                const user = {
                    id,
                    name: input.name,
                    email: input.email,
                    password: cypherPassword
                };
                const userDatabase = new UserDatabase_1.UserDatabase();
                yield userDatabase.insertUser(user);
                const tokenManager = new TokenManager_1.TokenManager();
                const token = tokenManager.generateToken({ id });
                return token;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    login(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.email || !input.password) {
                    throw new Error('"email" and "password" must be provided');
                }
                const userDatabase = new UserDatabase_1.UserDatabase();
                const user = yield userDatabase.getUserByEmail(input.email);
                if (!user) {
                    throw new Error("Invalid credentials");
                }
                const hashManager = new HashManager_1.HashManager();
                const passwordIsCorrect = yield hashManager.compare(input.password, user.password);
                if (!passwordIsCorrect) {
                    throw new Error("Invalid credentials");
                }
                const tokenManager = new TokenManager_1.TokenManager();
                const token = tokenManager.generateToken({
                    id: user.id
                });
                return token;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map