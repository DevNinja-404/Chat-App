import { Router } from "express";
import { contactServices } from "../controllers/contact.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/search").post(contactServices.getContacts);

export default router;
