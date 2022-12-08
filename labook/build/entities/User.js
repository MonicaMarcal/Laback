"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserModel = void 0;
function toUserModel(obj) {
    return obj && {
        id: obj.id,
        email: obj.email,
        name: obj.name,
        password: obj.password
    };
}
exports.toUserModel = toUserModel;
//# sourceMappingURL=User.js.map