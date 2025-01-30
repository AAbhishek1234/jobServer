import jwt from 'jsonwebtoken';
import { secretKey } from "../constants/auth.js";

export const verifyAccessToken = function (token) {
    try {
        console.log("Verifying JWT with secret key:", secretKey); // Debug log
        const decoded = jwt.verify(token, secretKey); 
        console.log("Decoded Token Data:", decoded);
        return { success: true, data: decoded };
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return { success: false, error: error.message };
    }
};
