import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import * as postService from "./post.service";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await postService.createPost(req.body);
    return res.status(httpStatus.CREATED).send({ iSuccess: true, data });
  } catch (err) {
    next(err);
  }
};

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { skip, limit, search, userId } = req.query;
    const data = await postService.getFilteredPosts({
      skip: +`${skip}`,
      limit: +`${limit}`,
      search: `${search}`,
      userId: `${userId}`,
    });
    return res.send({ isSuccess: true, data });
  } catch (err) {
    next(err);
  }
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const data = await postService.getPostById(postId);

    return res.send({ isSuccess: true, data });
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const data = await postService.updatePostById(postId, req.body);

    return res.send({ isSuccess: true, data });
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    await postService.deletePostById(postId);

    return res.status(httpStatus.NO_CONTENT).send({ isSuccess: true });
  } catch (err) {
    next(err);
  }
};
