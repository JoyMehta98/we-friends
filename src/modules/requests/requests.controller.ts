import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import * as requestsService from "./requests.service";
import { successMessages } from "constants/messages";

export const addRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await requestsService.addRequest(req.body);
    return res.status(httpStatus.CREATED).send({ iSuccess: true, data });
  } catch (err) {
    next(err);
  }
};

export const getRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { skip, limit, userId } = req.query;
    const data = await requestsService.getRequests({
      skip: +`${skip}`,
      limit: +`${limit}`,
      userId: `${userId}`,
    });
    return res.send({ isSuccess: true, data });
  } catch (err) {
    next(err);
  }
};

export const updateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await requestsService.updateRequest(req.body);

    return res.status(httpStatus.NO_CONTENT).send({ isSuccess: true });
  } catch (err) {
    next(err);
  }
};

export const removeRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, requesterId } = req.body;

    if (!requesterId || !userId) {
      return res.status(httpStatus.BAD_REQUEST).send({ isSuccess: false });
    }

    await requestsService.removeRequest(userId, requesterId);

    return res.status(httpStatus.NO_CONTENT).send({ isSuccess: true });
  } catch (err) {
    next(err);
  }
};
