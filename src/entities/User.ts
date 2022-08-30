import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import { PostsEntity } from './Post';

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({nullable: false})
    full_name: string;

    @Column({nullable: false})
    password: string

    @Column()
    avatarUrl: string;

    @OneToMany(
        () => PostsEntity,
        post => post.user
    )
    posts: PostsEntity[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
};
