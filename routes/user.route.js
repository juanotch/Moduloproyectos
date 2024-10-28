import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { verifytoken } from "../middlewares/jwt.middlware.js";

import { verifyRole } from "../middlewares/jwt.middlware.js";

const router =Router()

router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/profile',verifytoken,verifyRole(['usuario']),userController.profile)
export default router;