import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import * as commentService from "./comment.service";

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await commentService.createComment(req.body);
    return res.status(httpStatus.CREATED).send({ iSuccess: true, data });
  } catch (err) {
    next(err);
  }
};

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { skip, limit, search, userId } = req.query;
    const data = await commentService.getFilteredComments({
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

export const getComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;
    const data = await commentService.getCommentById(commentId);

    return res.send({ isSuccess: true, data });
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;
    const data = await commentService.updateCommentById(commentId, req.body);

    return res.send({ isSuccess: true, data });
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;
    await commentService.deleteCommentById(commentId);

    return res.status(httpStatus.NO_CONTENT).send({ isSuccess: true });
  } catch (err) {
    next(err);
  }
};
