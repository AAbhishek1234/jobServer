import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { getCompany, getCompanyById, registerCompany, updatedCompany } from '../controllers/companyController.js';
const router = express.Router();

router.post('/register', authenticateToken,registerCompany);
router.get('/getcompany',authenticateToken, getCompany);
router.get("/getbyid/:id",authenticateToken,getCompanyById);
router.put("/update/:id",authenticateToken,updatedCompany);

export default router;
