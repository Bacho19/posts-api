import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { UserEntity } from './entities/User';
import { PostsEntity } from './entities/Post';
import { PostCommentsEntity } from './entities/PostComments';
import { PostLikesEntity } from './entities/PostLikes';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [UserEntity, PostsEntity, PostCommentsEntity, PostLikesEntity],
    synchronize: true,
});
