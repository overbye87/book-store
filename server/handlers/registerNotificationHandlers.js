const db = require("../models");
const Sequelize = require("sequelize");

module.exports = (io, socket) => {
  socket.on("notification:get", getNotifications);
  socket.on("message:add", addNotification);
  //socket.on("message:remove", removeNotification);

  async function getNotifications() {
    const notifications = await db.Notification.findAll({
      where: {
        parentUserId: socket.userId,
        read: false,
      },
      include: ["parentUser", "replyUser"],
    });
    console.log("getNotifications", notifications);
  }

  async function addNotification(message) {
    // выполняем запрос на получение сообщений
    console.log(message);
    //socketRef.current.emit("message:add", message);
    //.in(socket.userId)

    io.emit("message", message);

    //getNotifications();
  }

  // обрабатываем удаление сообщение
  // функция принимает id сообщения
  //   const removeNotification = (messageId) => {
  //     db.get("messages").remove({ messageId }).write();

  //     //getNotifications();
  //   };
};
