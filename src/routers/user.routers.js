import { Router } from 'express';
import validateSchema from '../middleware/validation.js';
import { registerUser,loginUser, getProfile, logoutUser, getRandomJoke } from '../controllers/user.controllers.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/register').post(validateSchema, registerUser); 
router.route('/login').post(loginUser); 
router.get('/me', authenticate, getProfile);
router.get('/random-joke', authenticate, getRandomJoke);
router.post('/logout', authenticate, logoutUser);


export default router;
