const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/auth.auth");
const canvasRoutes = require("./src/routes/canvas.route");

const app = express();

// --- 1. GLOBAL MIDDLEWARE ---
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- 2. ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/canvases", canvasRoutes);

// --- 3. 404 HANDLER (For unknown routes) ---
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error); // Passes it to the Global Error Handler
});

// --- 4. GLOBAL ERROR HANDLER (MUST HAVE 4 ARGUMENTS) ---
app.use((err, req, res, next) => {
  console.error("Internal Error Stack:", err.stack); // For your terminal

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    // Only show stack trace in development mode
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

module.exports = app;
