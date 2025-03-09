import { IsDefined, Matches } from "class-validator";
import { Expose } from "class-transformer";

export class CreateBlogDto {
  @IsDefined()
  @Expose()
  @Matches(/^[\w\s]{3,100}$/, { message: "Title must be 3-100 characters long and can only contain letters, numbers, and spaces." })
  title: string;

  @IsDefined()
  @Expose()
  @Matches(/^[\s\S]{10,5000}$/, { message: "Text must be between 10 and 5000 characters." })
  text: string;

  @IsDefined()
  @Expose()
  @Matches(/^[a-f\d]{24}$/, { message: "Invalid author ID format." })
  author: string;
}


export class BlogIdDto {
  @Matches(/^[a-f\d]{24}$/, { message: "Invalid blog ID format." })
  id: string;
}
