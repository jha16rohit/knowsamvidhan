import { NextResponse } from "next/server";
import type { Server as SocketIOServer } from "socket.io";

export const runtime = "nodejs";

declare global {
  namespace globalThis {
    var __socketio: SocketIOServer | undefined;
  }
}

export function getSocketServer(): SocketIOServer | undefined {
  if (!global.__socketio) {
    const { Server } = require("socket.io");
    const io = new Server({
      path: "/api/socketio",
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    
    io.on("connection", (socket: any) => {
      console.log("Client connected:", socket.id);
      
      socket.on("subscribe", (channel: string) => {
        socket.join(channel);
      });
      
      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });
    
    global.__socketio = io;
  }
  return global.__socketio;
}

export async function GET() {
  return NextResponse.json({ 
    status: "Socket.io endpoint active",
    path: "/api/socketio"
  });
}

export function emitToChannel(channel: string, event: string, data: unknown) {
  const io = getSocketServer();
  if (io) {
    io.to(channel).emit(event, data);
  }
}