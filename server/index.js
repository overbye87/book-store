require("dotenv").config();

const db = require("./models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");
const events = require("events");
const emitter = new events.EventEmitter();

const registerNotificationHandlers = require("./handlers/registerNotificationHandlers");

const express = require("express");
const app = express();
const { createServer } = require("http");
const httpServer = createServer(app);

const PORT = process.env.PORT || 4000;

//WebSocket server
//--- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
const { Server } = require("socket.io");
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
//global._io = io;
const onConnection = async (socket) => {
  // get userId from handshake
  const { userId } = socket.handshake.query;
  console.log("User connected userId:", userId);
  socket.userId = userId;
  socket.join(userId);

  // send back userId to check connection
  io.in(socket.userId).emit("connected", userId);

  // get all notifications from db
  const notifications = await db.Notification.findAll({
    where: {
      parentUserId: socket.userId,
      read: false,
    },
    include: ["parentUser", "replyUser"],
  });
  //send all notifications
  io.in(socket.userId).emit("notifications", notifications);

  // регистрируем обработчики
  registerNotificationHandlers(io, socket);
  //registerUserHandlers(io, socket);

  // обрабатываем отключение сокета-пользователя
  socket.on("disconnect", () => {
    // выводим сообщение
    console.log("User disconnected");
    // покидаем комнату
    //socket.leave(roomId);
  });
};

io.on("connection", onConnection);
//--- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router(io));

app.use(errorHandler);

const start = async () => {
  try {
    //await db.sequelize.authenticate(); //test db connaction
    //await db.sequelize.sync();
    httpServer.listen(PORT, () =>
      console.log(`Server started on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

//const ws = require("ws");
// //const wsserver = new ws.Server({ port: WSPORT }, () => {
//   console.log(`WebSocket server started on port ${WSPORT}...`);
// });
// let ID = 0;
// io.on("connection", (socket) => {
//   socket.on("message", (message) => {
//     message = JSON.parse(message);
//     switch (message.event) {
//       case "message":
//         broadcast(message);
//         break;
//       case "connection":
//         socket.id = message.user.id;
//         //socket.send("Сonnection established...");
//         console.log("connection");
//         console.log("user ID =", message.user.id);
//         socket.id = message.user.id;
//         console.log("SOCKET:", socket.id);
//         //console.log(socket);
//         break;
//       case "getall":
//         socket.send(JSON.stringify(wss.clients));
//         break;
//     }
//   });
// });

// const broadcast = (message) => {
//   wsserver.clients.forEach((client) => {
//     client.send(JSON.stringify(message));
//   });
// };

// const unicast = (message, id) => {
//   wsserver.clients.forEach((client) => {
//     if (client.id === id) {
//       client.send(JSON.stringify(message));
//     }
//   });
// };
