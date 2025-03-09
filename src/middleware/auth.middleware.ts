import { NextFunction, Request, Response } from "express";
import { AuthUtils } from "../utils/AuthUtils";
import { UserModel } from "../models/user.model";
import { isJWT } from "class-validator";
import { IUser } from "../types/user.types";

// Extend Express Request to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authorization: string | undefined = req?.headers?.authorization;
    if (!authorization) throw { status: 401, message: "Authorization header missing!" };
    const [bearer, token] = authorization.split(" ");
    if (bearer.toLowerCase() !== "bearer") throw { status: 401, message: "Authorization token incorrect!" };
    if (!isJWT(token)) throw { status: 401, message: "Invalid token format!" };
    const decoded = AuthUtils.decodedToken(token);
    if (!decoded || !decoded.username || !decoded.id) throw { status: 401, message: "Unauthorized: Invalid token payload" };
    const user = await UserModel.findOne({ username: decoded.username }).lean();
    if (!user) throw { status: 401, message: "Unauthorized: User not found" };
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
