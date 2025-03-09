import { NextFunction, Request, Response } from "express";
import { Controller, Post } from "@overnightjs/core";
import { plainToClass } from "class-transformer";
import { RegisterDTO, LoginDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { IUser } from '../../types/user.types';


@Controller("auth")
export class AuthController {
  private authService: AuthService = new AuthService()
  @Post("register")
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const registerDto: RegisterDTO = plainToClass(RegisterDTO, req.body, { excludeExtraneousValues: true });
      const user: IUser = await this.authService.register(registerDto)
      res.status(201).json({ message: "User registered successfully!", user });
    } catch (error) {
      next(error);
    }
  }
  @Post("login")
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginDTO: LoginDTO = plainToClass(LoginDTO, req.body, { excludeExtraneousValues: true });
      const user: IUser = await this.authService.login(loginDTO)
      res.status(201).json({ statusCode: 200, data: { user } });
    } catch (error) {
      next(error);
    }
  }
}
