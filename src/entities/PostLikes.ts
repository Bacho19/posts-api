import {
    BaseEntity,
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
    name: 'post_likes',
})
export class PostLikesEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'like_id',
    })
    likeId: number;

    @ManyToOne(() => UserEntity, (user) => user.likes, {
        onDelete: 'SET NULL',
    })
    @JoinColumn({
        name: 'user_id',
    })
    user: UserEntity;

    @ManyToOne(() => PostsEntity, (post) => post.likes, {
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
