import { Router } from "express";
import { authMiddleware } from "middlewares";
import * as followerController from "modules/followers/followers.controller";

const router = Router();

router
  .route("/")
  .post(authMiddleware, followerController.addFollower)
  .get(authMiddleware, followerController.getFollowers)
  .delete(authMiddleware, followerController.removeFollower);

export default router;
