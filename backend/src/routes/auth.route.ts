import express from 'express';
import { signup, login , githubLogin} from '../controllers/auth.controller';
import passport from '../middleware/passport.middleware';
const router = express.Router();

router.post('/signup', signup); 

router.post('/login', login); 

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',  passport.authenticate('github', { failureRedirect: '/login' }), githubLogin )


export default router;   
                    