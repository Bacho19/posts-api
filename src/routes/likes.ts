import { Router } from 'express';
import { isAuth } from '../middlewares/auth';
import likesController from '../controllers/likes';

const router = Router();

router.get('/:id', isAuth, likesController.getLikes);
router.post('/like/:id', isAuth, likesController.likePost);
router.post('/dislike/:id', isAuth, likesController.dislikePost);

export default router;
