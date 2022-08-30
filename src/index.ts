import express from 'express';
import { AppDataSource } from './data-source';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
// app.use('/auth', require('./routes/auth.ts'));
// app.use('/posts', require('./routes/posts.ts'));

const loadDatabase = async () => {
    try {
        await AppDataSource.initialize()
        console.log('database was connected');
    } catch(e) {
        console.log(e);
        throw Error('Error: database wasn\'t connected');
    }
}

app.listen(PORT, () => {
    console.log(`server was started on port ${PORT}`);
    loadDatabase();
});
