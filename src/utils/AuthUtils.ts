import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { jwtGeneratorPayloadDTO } from "../types/public.types";
import { Algorithm, sign } from "jsonwebtoken";
import { UserModel } from "../models/user.model";

export const HashString = (data: string): string => {
  const salt: string = genSaltSync(10);
  return hashSync(data, salt);
};

export const compareHashString = (data: string, encrypted: string): boolean => {
  return compareSync(data, encrypted);
};

export const jwtGenerator = async (payload: jwtGeneratorPayloadDTO): Promise<string> => {
  const { id } = payload;
  const user = await UserModel.findById(id);
  if (!user) throw new Error("User not found");
  const expiresIn = new Date().getTime() + (1000 * 60 * 60 * 24)
  const algorithm: Algorithm = "HS512";
  return new Promise((resolve, reject) => {
    sign(
      payload,
      process.env.AccessTokenSecretKey as string,
      { expiresIn, algorithm },
      async (error, token) => {
        if (error || !token) return reject(new Error("Token generation failed"));
        user.accessToken = token;
        await user.save();
        resolve(token);
      }
    );
  });
};

