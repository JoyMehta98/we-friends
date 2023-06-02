import { Router } from "express";
import { authMiddleware } from "middlewares";
import * as postController from "modules/post/post.controller";

const router = Router();

router
  .route("/")
  .post(authMiddleware, postController.createPost)
  .get(postController.getPosts);

router
  .route("/:postId")
  .get(authMiddleware, postController.getPost)
  .patch(authMiddleware, postController.updatePost)
  .delete(authMiddleware, postController.deletePost);

export default router;
