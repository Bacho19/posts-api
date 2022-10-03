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

    @ManyToOne(() => UserEntity, (user) => user.comments)
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
