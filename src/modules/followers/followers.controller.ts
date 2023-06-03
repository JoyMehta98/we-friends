import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import * as followersService from "./followers.service";

export const addFollower = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await followersService.addFollower(req.body);
    return res.status(httpStatus.CREATED).send({ iSuccess: true, data });
  } catch (err) {
    next(err);
  }
};

export const getFollowers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { skip, limit, userId } = req.query;
    const data = await followersService.getFollowers({
      skip: +`${skip}`,
      limit: +`${limit}`,
      userId: `${userId}`,
    });
    return res.send({ isSuccess: true, data });
  } catch (err) {
    next(err);
  }
};

export const removeFollower = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, followerId } = req.body;

    if (!followerId || !userId) {
      return res.status(httpStatus.BAD_REQUEST).send({ isSuccess: false });
    }

    await followersService.removeFollower(userId, followerId);

    return res.status(httpStatus.NO_CONTENT).send({ isSuccess: true });
  } catch (err) {
    next(err);
  }
};
