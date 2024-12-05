import express, { Application, urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import session from 'express-session'
import http from 'http'
import { Server } from 'socket.io'
import authRoute from './routes/auth.route'
import messageRoute from './routes/message.route'
import groupRoute from './routes/group.route'
import passport from './middleware/passport.middleware' 
import sokect from "./sockets/chatSocket"

dotenv.config()
const app : Application = express() 

const httpServer = http.createServer(app)
const io = new Server(httpServer,{
  cors:{
    origin : '*',
    methods : ['GET','POST','PUT']
  }
}) 

  sokect(io)
 app.use(cors({
  origin : '*',
  methods : ['GET','POST','PUT','DELETE'],
  credentials : false
}))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
//

// Set up session
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
 




app.use('/auth',authRoute)
app.use('/message' ,messageRoute)
app.use('/group', groupRoute)
app.get('/',(req,res) => {
  res.json( "Home Page"); 
}) 

// io.on('connection', (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   // Emit a "Hi" message to the user when they connect
//   socket.emit('message', { senderId: 'server', content: 'Hi' });

//   // Handle incoming messages
//   socket.on('message', (data) => {
//     console.log('Received message:', data);
//     io.emit('message', data); // Broadcast message to all connected clients
//   });

//   // Handle disconnections
//   socket.on('disconnect', () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });


export default httpServer ; 

