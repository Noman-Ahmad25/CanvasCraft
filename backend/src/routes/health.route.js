const express = require("express");
const router = express.Router();
const { healthCheck } = require("../controllers/health.controller");

router.get("/health", healthCheck);


router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CanvasCraft API is Online",
        environment: process.env.NODE_ENV || "development",
        documentation: "https://github.com/Noman-Ahmad25/CanvasCraft"
    });
});

module.exports = router;
