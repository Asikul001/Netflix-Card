const jwt = require("jsonwebtoken");

// Runs before protected routes: checks the JWT sent in the Authorization header
module.exports = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;
  if (!token)
    return res.status(401).json({ message: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // attach user id for the next handler
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
