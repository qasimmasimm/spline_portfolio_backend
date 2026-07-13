const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.header(process.env.JWT_TOKEN_HEADER);

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token." });
    }

    try {
        verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        next();
    }
    catch (err) {
        return res.status(400).json({ message: "Invalid token" });
    }
}

module.exports = auth;