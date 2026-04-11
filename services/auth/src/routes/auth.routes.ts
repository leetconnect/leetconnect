import { Router } from 'express';
import { register, login, refresh} from '../controllers/auth.controller';
import { registerValidator, loginValidator} from '../validators/auth.validator';
import { validate } from '../middlewares/validate';  
import {authMiddleware} from '@leetconnect/shared';

const router = Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.post('/refresh', refresh);


// test auth middleware 
router.get('/me', authMiddleware, (req, res) => {
  // If it gets here, the token is valid
  res.status(200).json({
    message: "Auth Service: Identity Verified",
    data: req.user // Should show { userId: "...", role: "..." }
  });
});

export default router;