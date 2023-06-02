import { Router } from "express";
import { default as authRouter } from "./auth.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", authRouter);
router.use("/auth", authRouter);

export default router;
