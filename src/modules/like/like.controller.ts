import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import * as likeService from "./like.service";

export const manageLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await likeService.manageLike(req.body);

    return res.status(httpStatus.CREATED).send({ iSuccess: true });
  } catch (err) {
    next(err);
  }
};
