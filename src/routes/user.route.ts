import { Router } from "express";
import { authMiddleware } from "middlewares";
import * as userController from "modules/user/user.controller";

const router = Router();

router
  .route("/")
  .post(userController.createUser)
  .get(authMiddleware, userController.getUsers);

router
  .route("/:userId")
  .get(authMiddleware, userController.getUser)
  .patch(authMiddleware, userController.updateUser)
  .delete(authMiddleware, userController.deleteUser);

export default router;
