import express from 'express'
import { authuser, registeruser, updateuserprofile, getuserprofile, logoutuser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/auth', authuser);
router.post('/', registeruser);
router.post('/logout', logoutuser);
router.put('/profile', protect, updateuserprofile);
router.get('/profile', protect, getuserprofile);


export default router;