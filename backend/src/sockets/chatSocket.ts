// import { Server, Socket } from 'socket.io';

// export const handleChatSockets = (socket: Socket, io: Server) => {
//   socket.on('join_chat', (chatId: string) => {
//     socket.join(chatId);
//     console.log(`User joined chat: ${chatId}`);
//   });

//   socket.on('send_message', (data: { chatId: string; message: string }) => {
//     io.to(data.chatId).emit('receive_message', data.message);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// };

