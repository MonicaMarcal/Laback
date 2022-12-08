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
exports.PostDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const Post_1 = require("../entities/Post");
class PostDatabase extends BaseDatabase_1.BaseDatabase {
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection("labook_posts")
                    .insert({
                    id: post.id,
                    photo: post.photo,
                    description: post.description,
                    type: post.type,
                    author_id: post.authorId,
                    created_at: post.createdAt.toISOString().substring(0, 10)
                });
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.connection("labook_posts")
                    .select("*")
                    .where({ id });
                return Post_1.toPostModel(result[0]);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
}
exports.PostDatabase = PostDatabase;
//# sourceMappingURL=PostDatabase.js.map