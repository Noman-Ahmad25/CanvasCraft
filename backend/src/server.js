require("dotenv").config();
const express = require("express"); // Ensure express is available
const app = require("../app"); // Assuming this is your express() instance
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandeller"); // The one we just built

// 1. Connect to Database
connectDB();

// 2. CRITICAL: Increase JSON limit BEFORE routes
// If these are already in ../app.js, make sure they use the 50mb limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 3. Import Routes
const authRouter = require("./routes/auth.route");
const healthRoutes = require("./routes/health.route");
const canvasRoute = require("./routes/canvas.route");

// 4. Mount Routes with Prefixes
app.use(healthRoutes);
app.use ("/api/auth",authRouter);
app.use("/api/canvases", canvasRoute); // This makes routes cleaner

// 5. THE SAFETY NET: Global Error Handler
// This MUST come after the routes
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is Running on port ${PORT}`));