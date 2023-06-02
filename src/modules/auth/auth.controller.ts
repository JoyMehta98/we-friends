import { NextFunction, Request, Response } from "express";
import * as authService from "./auth.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    res.send({ user, token });
  } catch (err) {
    next(err);
  }
};
