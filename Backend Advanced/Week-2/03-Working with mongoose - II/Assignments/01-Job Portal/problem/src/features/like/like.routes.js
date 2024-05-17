import express from "express";
import { getLikes, like } from "./like.controller.js";
import { auth } from "../../middlewares/jwtAuth.js";
const router = express.Router();

router.route("/like").post(auth, like);
router.route("/getlikes").get(auth, getLikes);

export default router;
