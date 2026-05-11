import type { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";

export function initializeIO(server: NetServer): SocketIOServer {
  const io = new SocketIOServer(server, {
    path: "/api/socketio",
    addTrailingSlash: false,
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("subscribe", (channel: string) => {
      socket.join(channel);
      console.log(`Socket ${socket.id} joined channel: ${channel}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  console.log("Socket.io server initialized");
  return io;
}

export function emitSecurityUpdate(io: SocketIOServer | null, channel: string, data: unknown) {
  if (io) {
    io.to(channel).emit("security:update", data);
  }
}