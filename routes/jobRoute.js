import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/jobController.js';
const router = express.Router();

router.post('/postjob', authenticateToken,postJob);
router.get('/getjob',authenticateToken, getAllJobs);
router.get("/getadminjobs",authenticateToken,getAdminJobs);
router.get("/get/:id",authenticateToken,getJobById);

export default router;