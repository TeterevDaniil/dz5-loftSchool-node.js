const io = require("socket.io").listen(8000);

io.socket.on("connection", socket =>{
    socket.emit("hello", "hi from server io!");
});