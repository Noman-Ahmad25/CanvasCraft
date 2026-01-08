require("dotenv").config();
const app = require("../app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Start Logic
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`🚀 Server is Running on port ${PORT}`));
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();
