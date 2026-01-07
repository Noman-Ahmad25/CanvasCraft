// middleware/error.js
module.exports = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log to console for the developer (Red text)
    console.error('\x1b[31m%s\x1b[0m', `[Server Error] ${err.stack}`);

    // 1. Mongoose bad ObjectId (CastError)
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        error = { message, status: 404 };
    }

    // 2. Mongoose duplicate key (MongoError code 11000)
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = { message, status: 400 };
    }

    // 3. Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = { message, status: 400 };
    }

    // Final Response
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
      // Include the stack trace ONLY in development mode
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};