const { Server } = require('socket.io');
const httpServer = require('http').createServer();

const io = new Server(httpServer, {
  transports: ['polling'],
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

httpServer.listen(3001, () => {
  console.log('Socket.io server running on port 3001');
});

module.exports = {
  io,
};
