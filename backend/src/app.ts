import express, { Application, urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieSession from 'cookie-session'
import session from 'express-session'
import authRoute from './routes/auth.route'
import messageRoute from './routes/message.route'
import groupRoute from './routes/group.route'
import passport from './middleware/passport.middleware'
// import passport from 'passport'
// const GitHubStrategy = require('passport-github2').Strategy;



dotenv.config()

const app : Application = express() 

app.use(cors({
    origin : '*',
    methods : ['GET','POST','PUT','DELETE'],
    credentials : false
}))

app.use(express.json())
app.use(express.urlencoded({extended : true}))
// Set up session
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
 

 // GitHub OAuth Strategy
// passport.use(new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID, 
//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     callbackURL: "http://localhost:8000/auth/github/callback",
//   },
//    function(accessToken:any, refreshToken:any, profile:any, done:any) {
//      console.log('profile...', profile)
//     //  User.findOrCreate({ githubId: profile.id }, (err, user) => {
//     //   return done(err, user);
//     // });
//     return done(null, profile);
//   }
// ));

// Serialize user into session
// passport.serializeUser((user:any, done) => {
//   done(null, user);
// });

// Deserialize user from session
// passport.deserializeUser((user:any, done) => {
//   done(null, user);
// });

// Route to initiate GitHub OAuth
//app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback route
// app.get('/auth/github/callback',
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   (req, res : any) => {
  
//     console.log('res..',res)
//     console.log('user..',res.user)
//     // console.log('users...',res.ServerResponse.user)
//     res.redirect('http://localhost:3000/dashboard');
//   });

// Route to log out

// app.get('/logout', (req, res) => {
//   req.logout((err) => {
//     res.redirect('http://localhost:3000');
//   });
// });


app.use('/auth',authRoute)
app.use('/message' ,messageRoute)
app.use('/group', groupRoute)
app.get('/',(req,res) => {
  res.json( "Home Page"); 
}) 

export default app ; 