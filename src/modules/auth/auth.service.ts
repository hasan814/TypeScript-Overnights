
import { RegisterDTO, LoginDTO } from './auth.dto';
import { errorHandler } from "../../utils/ApiErrorHandler";
import { UserModel } from "../../models/user.model";
import { AuthUtils } from "../../utils/AuthUtils";
import { ObjectId } from "mongoose";
import { IUser } from "../../types/user.types";

export class AuthService {
  async register(userDto: RegisterDTO): Promise<IUser> {
    errorHandler(userDto)
    const existUser = await UserModel.findOne({ username: userDto.username });
    if (existUser) throw { status: 404, message: "This user already exists" };
    const newPassword = AuthUtils.hashPassword(userDto.password);
    userDto.password = newPassword
    const user: IUser = await UserModel.create(userDto);
    return user
  }
  async login(loginDTO: LoginDTO): Promise<IUser> {
    errorHandler(loginDTO)
    const { username, password } = loginDTO
    if (!username || !password) throw { status: 400, message: "All required fields must be provided" }
    const existUser: IUser | null = await UserModel.findOne({ username });
    if (!existUser) throw { status: 401, message: "Username or Password is incorrect!" }
    const isValidUser: boolean = AuthUtils.comparePassword(password, existUser.password);
    if (!isValidUser) throw { status: 401, message: "Username or Password is incorrect!" };
    const accessToken = AuthUtils.generateToken({ username, id: existUser._id as ObjectId })
    existUser.accessToken = accessToken;
    await existUser.save()
    return existUser
  }
}
