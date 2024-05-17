import express from "express";
import { auth } from "../../middlewares/jwtAuth.js";
import { applyJob, postJob } from "./job.controller.js";

const router = express.Router();

router.route("/post").post(auth, postJob);
router.route("/apply/:id").get(auth, applyJob);

export default router;
