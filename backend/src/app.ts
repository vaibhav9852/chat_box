import express, { Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieSession from 'cookie-session'
import authRoute from './routes/auth.route'
import passport from 'passport'
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');

dotenv.config()

const app : Application = express() 

app.use(cors({
    origin : '*',
    methods : ['GET','POST','PUT','DELETE'],
    credentials : true
}))

app.use(express.json())
// Set up session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
 

 // GitHub OAuth Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID, 
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/github/callback",
  },
   function(accessToken:any, refreshToken:any, profile:any, done:any) {
    
    return done(null, profile);
  }
));

// Serialize user into session
passport.serializeUser((user:any, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user:any, done) => {
  done(null, user);
});

// Route to initiate GitHub OAuth
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback route
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res : any) => {
  
    console.log('res..',res)
    // console.log('users...',res.ServerResponse.user)
    res.redirect('http://localhost:3000/dashboard');
  });

// Route to log out
app.get('/logout', (req, res) => {
  req.logout((err) => {
    res.redirect('http://localhost:3000');
  });
});


app.use('/v1/auth',authRoute)

app.get('/',(req,res) => {
    res.send('Home Page') 
})

export default app ;