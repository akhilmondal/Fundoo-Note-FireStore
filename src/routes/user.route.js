import express from 'express';
import * as UserController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('', newUserValidator, UserController.newUser);

router.post('/login', UserController.userLogin);

export default router;
