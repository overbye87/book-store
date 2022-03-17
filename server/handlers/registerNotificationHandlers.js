const db = require("../models");
const Sequelize = require("sequelize");

module.exports = (io, socket) => {
  // LISTENER REMOVE
  socket.on("notification:remove", notificationRemove);
  async function notificationRemove(message) {
    console.log("notificationRemove", message);
    const result = await db.Notification.destroy({
      where: { id: message.notificationId },
    });
    console.log("nresultRemove", result);
    // EVENT REMOVE:RESULT
    io.emit("notification:remove:result", {
      status: Boolean(result),
      id: message.notificationId,
    });
  }
};
