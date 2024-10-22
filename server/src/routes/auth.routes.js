import { Router } from "express";
import { userController } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/get-currentUser").get(verifyJWT, userController.getCurrentUser);

export default router;
