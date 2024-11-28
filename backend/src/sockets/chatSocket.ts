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