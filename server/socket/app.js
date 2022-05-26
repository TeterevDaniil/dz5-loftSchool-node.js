const db = require("../models/db");
const helper = require("../helper/serialize");

module.exports = io => {

  const users = new Set();
  io.on('connection', (socket) => {
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
      const { recipientId, senderId, roomId, text } = ctx;
      const addMessage = db.addMessage(ctx);
      socket.broadcast.to(roomId).emit("message:add", { text, senderId, recipientId });
      socket.emit("message:add", { text, senderId, recipientId });

    });

    socket.on("message:history", ctx => {
      const { recipientId, userId, roomId, text } = ctx;
      async function mess(recipientId, userId) {
        const m = await db.getUserMessage(recipientId, userId);
        return m;
      }
      mess(recipientId, userId).then((result) => {
        const responseMess = result.map(n => helper.serializeMess(n))
        socket.broadcast.to(roomId).emit("message:history", responseMess);
        socket.emit("message:history", responseMess);
      })
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