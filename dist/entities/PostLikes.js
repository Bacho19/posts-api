"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostLikesEntity = void 0;
const typeorm_1 = require("typeorm");
const Post_1 = require("./Post");
const User_1 = require("./User");
let PostLikesEntity = class PostLikesEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'like_id',
    }),
    __metadata("design:type", Number)
], PostLikesEntity.prototype, "likeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.UserEntity, (user) => user.likes, {
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'user_id',
    }),
    __metadata("design:type", User_1.UserEntity)
], PostLikesEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Post_1.PostsEntity, (post) => post.likes, {
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'post_id',
    }),
    __metadata("design:type", Post_1.PostsEntity)
], PostLikesEntity.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], PostLikesEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], PostLikesEntity.prototype, "updatedAt", void 0);
PostLikesEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'post_likes',
    })
], PostLikesEntity);
exports.PostLikesEntity = PostLikesEntity;
//# sourceMappingURL=PostLikes.js.map