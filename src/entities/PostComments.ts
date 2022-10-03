import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { PostsEntity } from './Post';
import { UserEntity } from './User';

@Entity({
    name: 'post_comments',
})
export class PostCommentsEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'comment_id',
    })
    commentId: number;

    @Column()
    text: string;

    @ManyToOne(() => UserEntity, (user) => user.comments, {
        onDelete: 'SET NULL',
    })
    @JoinColumn({
        name: 'user_id',
    })
    user: UserEntity;

    @ManyToOne(() => PostsEntity, (post) => post.comments, {
        onDelete: 'SET NULL',
    })
    @JoinColumn({
        name: 'post_id',
    })
    post: PostsEntity;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;
}
