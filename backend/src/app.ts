import express, { Application, urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import session from 'express-session'
import http from 'http'
import { Server } from 'socket.io'
import authRoute from './routes/auth.route'
import messageRoute from './routes/message.route'
import groupRoute from './routes/group.route'
import userRoute from './routes/user.route'
import passport from './middleware/passport.middleware' 
import sokect from "./sockets/chatSocket"

dotenv.config()
const app : Application = express() 

const httpServer = http.createServer(app)
export const io = new Server(httpServer,{
  cors:{
    origin : '*',
    methods : ['GET','POST','PUT'] 
  }
}) 

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("joinRoom", (roomId: string) => {
    console.log(`${socket.id} joining room ${roomId}`);
    socket.join(roomId);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});  
//sokect(io) 
 app.use(cors({
  origin : '*',
  methods : ['GET','POST','PUT','DELETE'],
  credentials : false
}))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
 
app.use('/auth',authRoute)
app.use('/users',userRoute) 
app.use('/message' ,messageRoute)   
app.use('/group', groupRoute) 

app.get('/',(req,res) => {
  res.json( "Home Page"); 
}) 

export default httpServer;       

