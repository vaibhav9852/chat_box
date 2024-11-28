// import passport from 'passport';
// import { Strategy as GitHubStrategy } from 'passport-github2';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// passport.serializeUser(function(user, done) {
//     done(null, user);
//   });
  
//   passport.deserializeUser(function(obj : any, done) {
//     done(null, obj);
//   });
 
// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//       callbackURL: process.env.GITHUB_CALLBACK_URL!,
//     },
//      (accessToken : any, refreshToken : any, profile : any, done : any) => {
        
//         process.nextTick(function () {
      
//             // To keep the example simple, the user's GitHub profile is returned to
//             // represent the logged-in user.  In a typical application, you would want
//             // to associate the GitHub account with a user record in your database,
//             // and return that user instead.
//             console.log('profile',profile)   
//             return done(null, profile);
//           });
//     }
//   )
// );


// //Serialize user for session storage
// // passport.serializeUser((user: any, done) => {
// //     done(null, user.id);
// //   });
  

// //   // Deserialize user from session storage
// //   passport.deserializeUser(async (id: any, done) => {
// //     try {
// //       const user = await prisma.user.findUnique({ where: { id } });
// //       done(null, user);
// //     } catch (error) {
// //       done(error, null);
// //     }
// //   });


  
//   export default passport;
  
  
  
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import prisma from '../config/prisma';
import authService from '../services/auth.service'
import { hashPassword } from '../utils/auth.util';
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.GITHUB_CALLBACK_URL!,
    },
    async (accessToken : any, refreshToken : any, profile : any, done : any) => {
      try {
        console.log('profile',profile)
        
        let email = profile.username + '@gmail.com'
        let name =  profile.username
        let password = profile.nodeId
        let avatar = profile.photos[0].value
         console.log('pdata..',{name,email,password,avatar})
        let user
        user = await authService.findUserByEmail(email)
        console.log('find user result', user)
           if(!user){
            const hashedPassword = await hashPassword(password);
             user = await authService.createUser({name,email,password : hashedPassword,avatar})
           }
           console.log('create user',user)
         return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user for session storage
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session storage
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;

// import express from 'express';
// import session from 'express-session';

// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET!,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// Add your routes here

// */