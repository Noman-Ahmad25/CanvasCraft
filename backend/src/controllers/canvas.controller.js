const Canvas = require("../models/Canvas");

// GET /api/canvases
exports.getCanvasesAll = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const canvases = await Canvas.find({user: req.user._id})
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Canvas.countDocuments();

        return res.status(200).json({
            success: true,
            page,
            pages: Math.ceil(total / limit),
            count: canvases.length,
            data: canvases
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/canvases/:id
exports.getCanvasesById = async (req, res, next) => {
    try {
        const canvas = await Canvas.findById(req.params.id);

        if (!canvas) {
            return res.status(404).json({
                success: false,
                message: "Canvas not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: canvas
        });
    } catch (error) {
        next(error);
    }
};

// POST /api/canvases
exports.createCanvas = async (req, res, next) => {
    try {
        const {title, image} = req.body;
        const canvas = await Canvas.create({title, image, user: req.user._id}); 
        
        return res.status(201).json({
            success: true,
            data: canvas
        });
    } catch (error) {
        next(error);
    }
};
// PUT /api/canvases/:id
exports.updateCanvas = async (req, res, next) => {
    try {
        const canvas = await Canvas.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!canvas) {
            return res.status(404).json({
                success: false,
                message: "Canvas not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: canvas
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/canvases/:id
exports.deleteCanvas = async (req, res, next) => {
    try {
        const canvas = await Canvas.findByIdAndDelete(req.params.id);

        if (!canvas) {
            return res.status(404).json({
                success: false,
                message: "Canvas not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Canvas deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
