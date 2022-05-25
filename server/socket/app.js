module.exports = io => {

  const users = new Set();

  io.on('connection', (socket) => {

    console.log('a user connected');
    socket.on("users:connect", ctx => {
      const { username, userId } = ctx;
      const user = {
        username: username,
        socketId: socket.id,
        userId: userId,
        activeRoom: null
      }
      users.add(user);
      socket.broadcast.emit("users:add", user);
      socket.emit("users:list", Array.from(users));
    });

    socket.on("message:add", ctx => {
      console.log(ctx);
      const { recipientId, senderId, roomId, text } = ctx;
      socket.broadcast.to(roomId).emit("message:add", { text, senderId, recipientId });
      socket.emit("message:add", { text, senderId, recipientId });

    });


    socket.on('disconnect', () => {
      socket.broadcast.emit("users:leave", socket.id);
      users.forEach(user => {
        if (user.socketId === socket.id) {
          users.delete(user);
        }
      });
    });
  });
}