import express from 'express';
import { signup, login } from '../controllers/auth.controller';
import passport from '../middleware/passport.middleware';
const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('http://localhost:3000/dashboard'); 
  }
);

/*
// GitHub login route
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback route
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/'); // Redirect to the homepage or dashboard after successful login
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.redirect('/');
  });
});

*/

export default router;  
                    