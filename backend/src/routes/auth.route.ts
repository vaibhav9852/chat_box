import express from 'express';
import { signup, login , githubLogin} from '../controllers/auth.controller';
import passport from '../middleware/passport.middleware';
import { upload } from '../middleware/multerUpload.middleware';
const router = express.Router();

router.post('/signup', upload.fields([{name:'file',maxCount:1}]), signup); 

router.post('/login', login); 

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',  passport.authenticate('github', { failureRedirect: '/login' }), githubLogin )

// get me 
// forget password 
// reset password
// logout

export default router;   
                    