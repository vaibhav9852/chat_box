import express, { Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import expressSession from 'express-session'
import authRoute from './routes/auth.route'
import passport  from './middleware/passport'

dotenv.config()

const app : Application = express() 

app.use(cors({
    origin : '*',
    credentials : true
}))
app.use(expressSession({
    secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))
app.use(express.json())

 app.use(passport.initialize()); 
  app.use(passport.session());



app.use('/v1/auth',authRoute)

app.get('/',(req,res) => {
    res.send('Home Page') 
})

export default app ;