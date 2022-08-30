import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { UserEntity } from './User';

@Entity({
    name: 'posts'
})
export class PostsEntity {
    @PrimaryGeneratedColumn()
    post_id: number;

    @Column({
        nullable: false
    })
    title: string;

    @Column({
        nullable: false
    })
    body: string;

    @Column()
    image_url: string;

    @ManyToOne(
        () => UserEntity, 
        user => user.posts
    )
    @JoinColumn({
        name: 'user_id'
    })
    user: UserEntity

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
