import { Router } from 'express';
import { isAuth } from '../middlewares/auth';
import { postValidator } from '../validations/posts';
import postController from '../controllers/posts';

const router = Router();

router.post('/', [isAuth, ...postValidator], postController.createNewPost);

router.get('/', isAuth, postController.getAllPosts);

router.get('/my-posts', isAuth, postController.getMyPosts);

router.get('/:id', isAuth, postController.getOnePost);

router.delete('/:id', isAuth, postController.deleteOnePost);

export default router;
