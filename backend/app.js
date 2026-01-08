const express = require("express");
const cors = require("cors");
const authRouter = require("./src/routes/auth.route");
const healthRoutes = require("./src/routes/health.route");
const canvasRoute = require("./src/routes/canvas.route");
const errorHandler = require("./src/middleware/errorHandeller");

const app = express();

// 1. Global Middleware
app.use(cors({
  // Use the environment variable, or fallback to localhost for development
  origin: process.env.CLIENT_URL || "http://localhost:5173", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 2. Routes
app.use(healthRoutes); // Usually just /health
app.use("/api/auth", authRouter);
app.use("/api/canvases", canvasRoute);

// 3. Error Handling (Must be last)
app.use(errorHandler);

module.exports = app;
