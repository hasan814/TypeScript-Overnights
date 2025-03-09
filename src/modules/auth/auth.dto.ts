import { IsDefined, IsOptional, Matches } from "class-validator";
import { Expose } from "class-transformer";


export class RegisterDTO {
  @IsDefined()
  @Matches(/^[a-zA-Z0-9_]{3,20}$/, { message: "Username must be 3-20 characters and contain only letters, numbers, and underscores" })
  @Expose()
  username: string;

  @IsDefined()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,20}$/, { message: "Password must be 6-20 characters, including at least one letter and one number" })
  @Expose()
  password: string;

  @IsDefined()
  @Matches(/^[a-zA-Z\s]{3,50}$/, { message: "Full name must be 3-50 characters and contain only letters and spaces" })
  @Expose()
  fullName: string;

  @IsOptional()
  @Matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, { message: "Invalid email format" })
  @Expose()
  email?: string;

  @IsOptional()
  @Matches(/^\d{10,15}$/, { message: "Mobile number must be between 10 and 15 digits" })
  @Expose()
  mobile?: string;

  @IsOptional()
  @Expose()
  avatar?: string;
}
