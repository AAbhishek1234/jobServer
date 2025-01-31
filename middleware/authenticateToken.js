import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided.", success: false });
    }

    const token = authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"

    try {
        const decoded = jwt.verify(token, "this-is-secret-key"); // Make sure this matches your login secret
        req.user = decoded;  // Attach user data
        req.id = decoded.userId; // Extract userId for requests
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", success: false });
    }
};
