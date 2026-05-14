import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import connectDB from "./config/db.js";

import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";

const app = express();
let wss;

app.use(cors());
app.use(express.json());

// routes
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/food", foodRoutes);
app.use("/images", express.static('uploads'));

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(5000, () => {
      console.log("Server running on port 5000 ✅");
    });

    // WebSocket Setup
    wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
        console.log("Admin connected to WebSocket");
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

export const broadcast = (data) => {
    try {
        if (wss) {
            wss.clients.forEach((client) => {
                if (client.readyState === 1) { // 1 is OPEN
                    client.send(JSON.stringify(data));
                }
            });
        }
    } catch (error) {
        console.error("Broadcast error:", error.message);
    }
};