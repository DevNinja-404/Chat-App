import { Server as socketIOServer } from "socket.io";
import { Message } from "./models/message.model.js";

const setupSocket = (server) => {
  const io = new socketIOServer(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`Client disconnected: ${socket.id} `);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessgae = await Message.create(message);

    // the populate here takes two parameters,the first one is the field which u want to replace with and the second one is/are the fields with which u want to replace the first field ,remember it replaces the field with the fields of the reference model which u have provided while making the Message model,here its User model
    const messageData = await Message.findById(createdMessgae._id)
      .populate("sender", "id email firstName lastName image color")
      .populate("recipient", "id email firstName lastName image color");

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receiveMessage", messageData);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("receiveMessage", messageData);
    }
  };

  io.on("connection", (socket) => {
    console.log(socket.handshake);

    const { userId } = socket.handshake.query;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(userSocketMap);

      console.log(
        `User connected with userId:${userId} with socket ID:${socket.id}`
      );
    } else {
      console.log("userId not provided during connection.");
    }

    socket.on("sendMessage", sendMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;
