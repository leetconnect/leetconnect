import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { registerValidator, loginValidator} from '../validators/auth.validator';
import { validate } from '../middlewares/validate';  

const router = Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
// router.post('/refresh', refresh);

export default router;