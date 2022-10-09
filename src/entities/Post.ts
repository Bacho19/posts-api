import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToMany,
} from 'typeorm';
import { PostCommentsEntity } from './PostComments';
import { PostLikesEntity } from './PostLikes';
import { UserEntity } from './User';

@Entity({
    name: 'posts',
})
export class PostsEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'post_id',
    })
    postId: number;

    @Column({
        nullable: false,
    })
    title: string;

    @Column({
        nullable: false,
    })
    body: string;

    @Column({
        name: 'image_url',
        nullable: true,
        default:
            'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg',
    })
    imageUrl: string;

    @ManyToOne(() => UserEntity, (user) => user.posts, {
        onDelete: 'SET NULL',
    })
    @JoinColumn({
        name: 'user_id',
    })
    user: UserEntity;

    @OneToMany(() => PostCommentsEntity, (comment) => comment.post)
    comments: PostCommentsEntity[];

    @OneToMany(() => PostLikesEntity, (like) => like.post)
    likes: PostLikesEntity[];

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;
}
