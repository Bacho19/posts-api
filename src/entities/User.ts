import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    BaseEntity,
} from 'typeorm';
import { PostsEntity } from './Post';
import { PostCommentsEntity } from './PostComments';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'user_id',
    })
    userId: number;

    @Column({
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        name: 'first_name',
        nullable: false,
    })
    firstName: string;

    @Column({
        name: 'last_name',
        nullable: false,
    })
    lastName: string;

    @Column({
        nullable: false,
    })
    password: string;

    @Column({
        name: 'avatar_url',
        nullable: true,
        default: 'https://www.011global.com/Account/Slices/user-anonymous.png',
    })
    avatarUrl: string;

    @OneToMany(() => PostsEntity, (post) => post.user)
    posts: PostsEntity[];

    @OneToMany(() => PostCommentsEntity, (comment) => comment.user)
    comments: PostCommentsEntity[];

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;
}
