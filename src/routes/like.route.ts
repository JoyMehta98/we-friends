import { Router } from "express";
import { authMiddleware } from "middlewares";
import * as likeController from "modules/like/like.controller";

const router = Router();

router.route("/manage").post(authMiddleware, likeController.manageLike);

export default router;
