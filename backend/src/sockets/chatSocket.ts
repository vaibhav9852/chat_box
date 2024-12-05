import { Server, Socket } from 'socket.io';
import prisma from '../config/prisma';

export default (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join', (roomId: string) => {
      socket.join(roomId);
    });
       
    socket.on('message', async (data) => {
      const { content, senderId, recipientId, groupId, fileUrl, fileType } = data;

      // Save message in DB
      const message = await prisma.message.create({
        data: { content, senderId,  groupId, fileUrl, fileType },
      });

      // Broadcast message
      const roomId = recipientId || groupId;
      io.to(roomId).emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

// npx prisma migrate dev --name updated_schema

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