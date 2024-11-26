import express from 'express';
import { signup, login } from '../controllers/auth.controller';
import passport from '../middleware/passport';
const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

// GitHub login route
router.get('/github', passport.authenticate('github', { scope: ['user:email'] })); 

// GitHub callback route
router.get( '/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/'); // Redirect to the homepage or dashboard after successful login
  }
);

export default router;  
                    