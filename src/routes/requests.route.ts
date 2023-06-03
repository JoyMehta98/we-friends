import { Router } from "express";
import { authMiddleware } from "middlewares";
import * as requestsController from "modules/requests/requests.controller";

const router = Router();

router
  .route("/")
  .post(authMiddleware, requestsController.addRequest)
  .get(authMiddleware, requestsController.getRequests)
  .patch(authMiddleware, requestsController.updateRequest)
  .delete(authMiddleware, requestsController.removeRequest);

export default router;
