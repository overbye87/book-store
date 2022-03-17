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
    origin: "*", // F*** CORS
  },
});
//global._io = io;
const onConnection = async (socket) => {
  // get userId from handshake
  const { userId } = socket.handshake.query;
  console.log("WS User connected userId:", userId);
  socket.userId = userId;
  socket.join(userId);

  // EVENT CONNECTED (send back userId to check connection)
  io.in(socket.userId).emit("connected", userId);

  // get all notifications from db
  const notifications = await db.Notification.findAll({
    where: {
      parentUserId: socket.userId,
      read: false,
    },
    include: ["parentUser", "replyUser"],
  });

  // EVENT NOTIFICATIONS (send all notifications)
  io.in(socket.userId).emit("notifications", notifications);

  //HANDLERS
  registerNotificationHandlers(io, socket);

  // LISTENER DISCONNECTED
  socket.on("disconnect", () => {
    console.log("WS User disconnected userId:", userId);
    socket.leave(userId);
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
