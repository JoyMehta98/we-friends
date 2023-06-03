import { Router } from "express";
import { default as authRouter } from "./auth.route";
import { default as userRouter } from "./user.route";
import { default as postRouter } from "./post.route";
import { default as commentRouter } from "./comment.route";
import { default as likeRouter } from "./like.route";
import { default as followerRouter } from "./follower.route";
import { default as requestRouter } from "./requests.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/like", likeRouter);
router.use("/follower", followerRouter);
router.use("/request", requestRouter);

export default router;
