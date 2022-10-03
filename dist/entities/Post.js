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
exports.PostsEntity = void 0;
const typeorm_1 = require("typeorm");
const PostComments_1 = require("./PostComments");
const User_1 = require("./User");
let PostsEntity = class PostsEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'post_id',
    }),
    __metadata("design:type", Number)
], PostsEntity.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], PostsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], PostsEntity.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'image_url',
        nullable: true,
    }),
    __metadata("design:type", String)
], PostsEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.UserEntity, (user) => user.posts, {
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'user_id',
    }),
    __metadata("design:type", User_1.UserEntity)
], PostsEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PostComments_1.PostCommentsEntity, (comment) => comment.post),
    __metadata("design:type", Array)
], PostsEntity.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], PostsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], PostsEntity.prototype, "updatedAt", void 0);
PostsEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'posts',
    })
], PostsEntity);
exports.PostsEntity = PostsEntity;
//# sourceMappingURL=Post.js.map