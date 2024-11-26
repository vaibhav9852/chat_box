import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj : any, done) {
    done(null, obj);
  });
 
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.GITHUB_CALLBACK_URL!,
    },
     (accessToken : any, refreshToken : any, profile : any, done : any) => {
        
        process.nextTick(function () {
      
            // To keep the example simple, the user's GitHub profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the GitHub account with a user record in your database,
            // and return that user instead.
            console.log('profile',profile)   
            return done(null, profile);
          });
    }
  )
);


//Serialize user for session storage
// passport.serializeUser((user: any, done) => {
//     done(null, user.id);
//   });
  

//   // Deserialize user from session storage
//   passport.deserializeUser(async (id: any, done) => {
//     try {
//       const user = await prisma.user.findUnique({ where: { id } });
//       done(null, user);
//     } catch (error) {
//       done(error, null);
//     }
//   });


  
  export default passport;
  
  
  
  

