import jwt from "jsonwebtoken";
import { secretKey } from "../constants/auth.js";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]; // Extract auth header
    if (!authHeader) {
        return res.status(401).json({ msg: "Access denied, no token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer TOKEN"
    if (!token) {
        return res.status(401).json({ msg: "Invalid token format" });
    }

    try {
        const decoded = jwt.verify(token, secretKey); // Verify token
        req.user = decoded; // Attach user data to request
        next(); // Move to next middleware
    } catch (error) {
        return res.status(403).json({ msg: "Invalid token", error: error.message });
    }
};
