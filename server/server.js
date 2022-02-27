const express = require('express');
const cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    // origin: 'http://localhost:3000'
    origin: '*'
  }
});

let connections = {};
let users = {};
// let candidates = {};

io.on("connection", (socket) => {
  // ...
  connections[socket.id] = {};
  // console.log(JSON.stringify(connections));
  socket.on("ice candidates", (newIceCandidates) => {
    if (!connections[socket.id].iceCandidates) {
      connections[socket.id].iceCandidates = {};
    }
    connections[socket.id].iceCandidates = newIceCandidates;
    // console.log(JSON.stringify(connections));
  })

  socket.on("name", (name) => {
    if (users[name]) {
      // emit error
      socket.emit('username exists');
    } else {
      users[name] = socket.id;
      connections[socket.id].name = name;
      socket.emit('username assigned');
    }
  });

  socket.on("request answer", (targetName) => {
    if (!users[targetName] && connections[socket.id].name && connections[socket.id].iceCandidates) {
      // emit error
      socket.emit('error');
    } else {
      socket.to(users[targetName]).emit('request answer', connections[socket.id].name, connections[socket.id].iceCandidates);
    }
  });

  socket.on("propagate answer", (targetName, answer) => {
    if (!users[targetName] && connections[socket.id].name) {
      // emit error
      socket.emit('error');
    } else {
      socket.to(users[targetName]).emit('answer', connections[socket.id].name, answer);
    }
  });

  socket.on("disconnect", () => {
    if (connections[socket.id].name && users[connections[socket.id].name]) {
      // emit error
      delete users[connections[socket.id].name];
    }
    delete connections[socket.id];
  });
});

// app.get('/api/customers', cors(), (req, res) => {
//   const customers = [
//     {id: 1, firstName: 'John', lastName: 'Doe'},
//     {id: 2, firstName: 'Brad', lastName: 'Traversy'},
//     {id: 3, firstName: 'Mary', lastName: 'Swanson'},
//   ];

//   res.json(customers);
// });

const port = 5000;

httpServer.listen(port, () => `Server running on port ${port}`);