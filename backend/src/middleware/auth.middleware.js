const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

  
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }

    const token = authHeader.split(" ")[1];

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Usually, JWT payloads use 'id'. If you used '_id', keep it as is.
        req.user = await User.findById(decoded.id || decoded._id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "User no longer exists" });
        }

        next();
    } catch (error) {
        // This catches expired tokens or altered tokens
        res.status(401).json({ message: "Invalid or Expired Token" });
    }
};