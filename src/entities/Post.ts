import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from 'typeorm';
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
    })
    imageUrl: string;

    @ManyToOne(() => UserEntity, (user) => user.posts, {
        onDelete: 'SET NULL',
    })
    @JoinColumn({
        name: 'user_id',
    })
    user: UserEntity;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;
}
