require('dotenv').config()
const { Server } = require("socket.io");
const PORT = process.env.PORT || 5001;

const io = new Server({
    cors: {
        origins: "*:*",
    }
});

let users = [];

const setUser = (userEmail, socketId) => {
    !users.find(user => user.userEmail === userEmail) &&
        users.push({ userEmail, socketId });
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userEmail) => {
    return users.find(user => user.userEmail === userEmail);
}

io.on("connection", (socket) => {
    // when connect
    console.log("a user connected");

    // take userEmail and socketId from user
    socket.on('setUser', userEmail => {
        setUser(userEmail, socket.id);
        io.emit('getUsers', users);
    });

    // send and get message
    socket.on('sendMessage', ({ senderEmail, receiverEmail, text }) => {
        console.log({ senderEmail, receiverEmail, text });
        const user = getUser(receiverEmail);
        io.to(user?.socketId).emit('getMessage', { senderEmail, text });
    })

    // when disconnect
    socket.on('disconnect', () => {
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
});

io.listen(PORT);