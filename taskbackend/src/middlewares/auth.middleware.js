const jwt = require("jsonwebtoken");
const BlacklistModel = require("../Models/blacklist.model"); // blacklist schema import

const authMiddleware = async (req, res, next) => {
  try {
    // 1️⃣ Read token from HttpOnly cookie
    console.log("COOKIES:", req.cookies);
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // 2️⃣ Check if token is blacklisted
    const isBlacklisted = await BlacklistModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(403).json({ message: "Forbidden: Token is blacklisted" });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 4️⃣ Attach user info to request
    req.user = decoded;

    // 5️⃣ Continue to next middleware/controller
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
