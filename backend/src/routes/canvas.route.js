const express = require('express');
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const {
    getCanvasesAll,
    getCanvasesById,
    createCanvas,
    updateCanvas,
    deleteCanvas
} = require('../controllers/canvas.controller');

const validateCanvas = require('../middleware/validateCanvas');

// 1. Move protection to the TOP
router.use(protect);

// 2. Clean up paths (assuming /api/canvases is the base in server.js)
router.get('/', getCanvasesAll);
router.get('/:id', getCanvasesById);
router.post('/', validateCanvas, createCanvas);
router.put('/:id', updateCanvas); // Changed from POST to PUT for updates
router.delete('/:id', deleteCanvas);

module.exports = router;