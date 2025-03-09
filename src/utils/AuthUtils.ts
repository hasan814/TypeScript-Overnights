import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { jwtToken } from "../types/public.types";

export class AuthUtils {
  public static hashPassword(password: string): string {
    const salt: string = genSaltSync(10);
    return hashSync(password, salt);
  }
  public static comparePassword = (password: string, hashedPassword: string): boolean => {
    return compareSync(password, hashedPassword);
  };
  public static generateToken(payload: jwtToken): string {
    const now: number = new Date().getTime()
    const expiresTime: number = 1000 * 60 * 60 * 24
    return sign(payload, process.env.AccessTokenSecretKey as string, { expiresIn: now + expiresTime })
  }
  public static decodedToken(token: string): jwtToken {
    return verify(token, process.env.AccessTokenSecretKey as string,) as jwtToken
  }
}


