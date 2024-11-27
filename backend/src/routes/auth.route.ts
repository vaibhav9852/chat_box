import express from 'express';
import { signup, login } from '../controllers/auth.controller';
import passport from '../middleware/passport';
const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

// router.post('/github-login', login);




export default router;  
                    