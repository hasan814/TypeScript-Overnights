import { BlogIdDto, CreateBlogDto } from "./blog.dto";
import { validateSync } from "class-validator";
import { errorHandler } from "../../utils/ApiErrorHandler";
import { BlogModel } from "../../models/blog.model";
import { TFindDoc } from "../../types/public.types";
import { IBlog } from "../../types/blog.types";


export class BlogService {
  async create(blogDto: CreateBlogDto): Promise<IBlog> {
    const errors = validateSync(blogDto)
    const checkedErrors = errorHandler(errors)
    if (checkedErrors.length > 0) throw { status: 400, errors: checkedErrors, message: "Validate incorrect!" }
    const blog: IBlog = await BlogModel.create(blogDto)
    return blog
  }
  async fetchAll(): Promise<IBlog[]> {
    const blogs: IBlog[] = await BlogModel.find({})
    return blogs
  }
  async fetchByID(blogId: BlogIdDto): Promise<TFindDoc<IBlog>> {
    const blog: TFindDoc<IBlog> = await BlogModel.findById(blogId.id)
    if (!blog) throw { status: 404, message: "NotFound Blog" }
    return blog
  }
  async removeByID(blogId: BlogIdDto): Promise<string> {
    const blog: TFindDoc<IBlog> = await this.fetchByID(blogId)
    const deleteResult: any = await BlogModel.deleteOne({ _id: blogId.id })
    if (deleteResult.deletedCount > 0) return "deleted Blog Successfully"
    return "Error: cannot remove Blog"
  }
}