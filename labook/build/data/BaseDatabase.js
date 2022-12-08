"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDatabase = void 0;
const knex_1 = __importDefault(require("knex"));
class BaseDatabase {
    constructor() {
        this.connection = knex_1.default({
            client: "mysql",
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                port: 3306,
                database: process.env.DB_NAME,
            }
        });
    }
}
exports.BaseDatabase = BaseDatabase;
//# sourceMappingURL=BaseDatabase.js.map