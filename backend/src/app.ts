import express, { Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth.route'
dotenv.config()

const app : Application = express() 

app.use(cors({
    origin : '*',
    credentials : true
}))

app.use(express.json())

app.use('/v1/auth',authRoute)

app.get('/',(req,res) => {
    res.send('Home Page') 
})

export default app ;