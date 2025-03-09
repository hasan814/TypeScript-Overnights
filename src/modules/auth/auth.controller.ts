import { NextFunction, Request, Response } from "express";
import { compareHashString, jwtGenerator } from "../../utils/AuthUtils";
import { Controller, Post } from "@overnightjs/core";
import { plainToClass } from "class-transformer";
import { RegisterDTO } from "./auth.dto";
import { AuthService } from './auth.service';
import { UserModel } from "../../models/user.model";
import { ObjectId } from "mongoose";
import { IUser } from '../../types/user.types';

const authService: AuthService = new AuthService()
@Controller("auth")
export class AuthController {
  @Post()
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const registerDto: RegisterDTO = plainToClass(RegisterDTO, req.body, { excludeExtraneousValues: true });
      const user: IUser = await authService.register(registerDto)
      res.status(201).json({ message: "User registered successfully!", user });
    } catch (error) {
      next(error);
    }
  }
  @Post()
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      if (!username || !password) return res.status(400).json({ message: "All required fields must be provided" });

      const existUser: IUser | null = await UserModel.findOne({ username });
      if (!existUser) return res.status(401).json({ message: "Username or Password is incorrect!" });

      const isValidUser: boolean = compareHashString(password, existUser.password);
      if (!isValidUser) return res.status(401).json({ message: "Username or Password is incorrect!" });

      const accessToken = await jwtGenerator({ username, id: existUser._id as ObjectId })
      const user = await UserModel.findById(existUser._id, { __v: 0, password: 0 })
      res.status(201).json({ statusCode: 200, data: { accessToken, user } });
    } catch (error) {
      next(error);
    }
  }
}
