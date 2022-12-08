"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPostModel = exports.POST_TYPES = void 0;
var POST_TYPES;
(function (POST_TYPES) {
    POST_TYPES["NORMAL"] = "normal";
    POST_TYPES["EVENT"] = "event";
})(POST_TYPES = exports.POST_TYPES || (exports.POST_TYPES = {}));
function toPostModel(obj) {
    return obj && {
        id: obj.id,
        photo: obj.photo,
        description: obj.description,
        type: obj.type,
        createdAt: obj.created_at,
        authorId: obj.author_id,
    };
}
exports.toPostModel = toPostModel;
//# sourceMappingURL=Post.js.map