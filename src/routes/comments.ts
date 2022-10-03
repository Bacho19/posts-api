import { Router } from 'express';
import { isAuth } from '../middlewares/auth';
import commentsController from '../controllers/comments';

const router = Router();

router.post('/:id', isAuth, commentsController.createComment);
router.get('/:id', isAuth, commentsController.getComments);

export default router;
