import jwt from 'jsonwebtoken'
import { secretKey } from "../constants/auth.js";

export const verifyAccessToken = function(token) {
    try {
      const decoded = jwt.verify(token, 'secretKey');
      console.log(decoded)
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }