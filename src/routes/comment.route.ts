import { Router } from "express";
import { authMiddleware } from "middlewares";
import * as commentController from "modules/comment/comment.controller";

const router = Router();

router
  .route("/")
  .post(authMiddleware, commentController.createComment)
  .get(authMiddleware, commentController.getComments);

router
  .route("/:commentId")
  .get(authMiddleware, commentController.getComment)
  .patch(authMiddleware, commentController.updateComment)
  .delete(authMiddleware, commentController.deleteComment);

export default router;
