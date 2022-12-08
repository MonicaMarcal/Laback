"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRouter_1 = require("./routes/userRouter");
const postRouter_1 = require("./routes/postRouter");
dotenv_1.default.config();
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use("/user", userRouter_1.userRouter);
app.use("/post", postRouter_1.postRouter);
app.listen(3003, () => {
    console.log("Server running on port 3003");
});
//# sourceMappingURL=index.js.map