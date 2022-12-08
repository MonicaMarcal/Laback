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
exports.PostBusiness = void 0;
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
const PostDatabase_1 = require("../data/PostDatabase");
class PostBusiness {
    createUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenManager = new TokenManager_1.TokenManager();
                if (!input.token) {
                    throw new Error("A jwt must be provided");
                }
                const tokenData = tokenManager.getTokenData(input.token);
                const idGenerator = new IdGenerator_1.IdGenerator();
                const id = idGenerator.generateId();
                const post = {
                    id,
                    authorId: tokenData.id,
                    createdAt: new Date(),
                    description: input.description,
                    photo: input.photo,
                    type: input.type
                };
                yield new PostDatabase_1.PostDatabase().createPost(post);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    getPostById(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield new PostDatabase_1.PostDatabase().getPostById(input.id);
                if (!post) {
                    throw new Error("Post not found");
                }
                return post;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.PostBusiness = PostBusiness;
//# sourceMappingURL=PostBusiness.js.map