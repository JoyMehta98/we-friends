import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await userService.createUser(req.body);
    return res.status(httpStatus.CREATED).send({ iSuccess: true, data });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { skip, limit, search } = req.query;
    const data = await userService.getFilteredUsers({
      skip: +`${skip}`,
      limit: +`${limit}`,
      search: `${search}`,
    });
    return res.send({ isSuccess: true, data });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const data = await userService.getUserById(userId);

    return res.send({ isSuccess: true, data });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const data = await userService.updateUserById(userId, req.body);

    return res.send({ isSuccess: true, data });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    await userService.deleteUserById(userId);

    return res.status(httpStatus.NO_CONTENT).send({ isSuccess: true });
  } catch (err) {
    next(err);
  }
};
