import { Router } from "express";
import { userController } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/logout").post(userController.logout);
router.route("/get-currentUser").get(verifyJWT, userController.getCurrentUser);
router
  .route("/update-profile")
  .patch(verifyJWT, userController.updateProfileDetails);

router
  .route("/update-profilePic")
  .patch(
    upload.single("profilePic"),
    verifyJWT,
    userController.updateProfilePic
  );

router
  .route("/remove-profilePic")
  .patch(verifyJWT, userController.removeProfilePic);

export default router;
