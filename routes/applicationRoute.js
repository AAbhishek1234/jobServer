import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/applicationController.js';
const router = express.Router();

router.post('/apply/:id', authenticateToken,applyJob);
router.get('/get',authenticateToken, getAppliedJobs);
router.get("/getapplicants/:id",authenticateToken,getApplicants);
router.put("/status/update/:id",authenticateToken,updateStatus);

export default router; 