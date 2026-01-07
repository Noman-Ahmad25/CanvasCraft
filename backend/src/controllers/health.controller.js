exports.healthCheck = (req, res) => {
    res.json({Status: "OK",Message: "Server is running"});
};