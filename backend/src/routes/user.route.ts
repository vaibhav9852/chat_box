import express from 'express';
import { getUsers , getUser} from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/',authenticate , getUsers)   
 
 router.get('/:id', getUser)

export default router;    
                    