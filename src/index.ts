import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import authRoute from './routes/auth';
import postsRoute from './routes/posts';
import commentsRoute from './routes/comments';
import likesRoute from './routes/likes';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: process.env.CLIENT_URL,
    })
);
app.use(express.json());
app.use('/auth', authRoute);
app.use('/posts', postsRoute);
app.use('/comments', commentsRoute);
app.use('/likes', likesRoute);

const loadDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log('database was connected');
    } catch (e) {
        console.log(e);
        throw Error("Error: database wasn't connected");
    }
};

app.listen(PORT, () => {
    console.log(`server was started on port ${PORT}`);
    loadDatabase();
});
