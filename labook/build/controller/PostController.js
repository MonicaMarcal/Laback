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
exports.PostController = void 0;
const PostBusiness_1 = require("../business/PostBusiness");
class PostController {
    constructor() {
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let message = "Success!";
                const token = req.headers.authorization;
                const input = {
                    photo: req.body.photo,
                    description: req.body.description,
                    type: req.body.type,
                    token
                };
                yield new PostBusiness_1.PostBusiness().createUser(input);
                res.status(201).send({ message });
            }
            catch (error) {
                let message = error.sqlMessage || error.message;
                res.statusCode = 400;
                res.send({ message });
            }
        });
        this.getPostById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let message = "Success!";
                const input = {
                    id: req.params.id
                };
                const post = yield new PostBusiness_1.PostBusiness().getPostById(input);
                const output = {
                    photo: post.photo,
                    type: post.type,
                    description: post.description,
                    createdAt: post.createdAt
                };
                res.status(200).send({ message, output });
            }
            catch (error) {
                let message = error.sqlMessage || error.message;
                res.statusCode = 400;
                res.send({ message });
            }
        });
    }
}
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map