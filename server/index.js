require("dotenv").config();
const express = require("express");
const db = require("./models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");
const events = require("events");
const emitter = new events.EventEmitter();

const PORT = process.env.PORT || 4000;
const WSPORT = 5000;

//WebSocket server
//--- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
const ws = require("ws");
const wsserver = new ws.Server({ port: WSPORT }, () => {
  console.log(`WebSocket server started on port ${WSPORT}...`);
});
let ID = 0;
wsserver.on("connection", (socket) => {
  socket.id = ID++;
  console.log("SOCKET:", socket.id);
  socket.on("message", (message) => {
    message = JSON.parse(message);
    switch (message.event) {
      case "message":
        broadcast(message);
        break;
      case "connection":
        //socket.send("Сonnection established...");
        break;
      case "getall":
        socket.send(JSON.stringify(wss.clients));
        break;
    }
  });
});

const broadcast = (message) => {
  wsserver.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
};

const unicast = (message, id) => {
  wsserver.clients.forEach((client) => {
    if (client.id === id) {
      client.send(JSON.stringify(message));
    }
  });
};
//--- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

app.use(errorHandler);

const start = async () => {
  try {
    //await db.sequelize.authenticate(); //test db connaction
    //await db.sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
