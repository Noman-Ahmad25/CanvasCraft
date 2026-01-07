module.exports = (req, res, next) => {
    const { title, image } = req.body;

    // 1. Check if fields exist and aren't just whitespace
    if (!title || typeof title !== 'string' || title.trim() === "") {
        return res.status(400).json({
            success: false,
            message: 'A valid Title is required'
        });
    }

    if (!image) {
        return res.status(400).json({
            success: false,
            message: 'Image data is required'
        });
    }

    // 2. Optional: Basic check to ensure it's a Data URL (Base64)
    if (!image.startsWith('data:image/')) {
        return res.status(400).json({
            success: false,
            message: 'Invalid image format. Must be a base64 data URL'
        });
    }

    next();
};