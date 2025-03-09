import { NextFunction, Request, Response } from "express";
import { Controller, Delete, Get, Post } from "@overnightjs/core";
import { BlogIdDto, CreateBlogDto } from "./blog.dto";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { errorHandler } from "../../utils/ApiErrorHandler";
import { BlogService } from "./blog.service";
import { TFindDoc } from "../../types/public.types";
import { IBlog } from "../../types/blog.types";


@Controller("blog")
export class BlogController {
  private blogService: BlogService = new BlogService()
  @Post()
  async createBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const blogDto: CreateBlogDto = plainToClass(CreateBlogDto, req.body)
      errorHandler(blogDto)
      const blog: IBlog = await this.blogService.create(blogDto)
      return res.status(201).json({ statusCode: 201, message: "Created Blog Successfully!", data: { blog } })
    } catch (error) {
      next(error)
    }
  }
  @Get()
  async GetAllBlogs(req: Request, res: Response, next: NextFunction) {
    try {
      const blogs: IBlog[] = await this.blogService.fetchAll()
      return res.status(200).json({ statusCode: 200, data: { blogs } })
    } catch (error) {
      next(error)
    }
  }
  @Get("find/:id")
  async GetBlogById(req: Request, res: Response, next: NextFunction) {
    try {
      const blogDto: BlogIdDto = plainToClass(BlogIdDto, req.params)
      const blog: TFindDoc<IBlog> = await this.blogService.fetchByID(blogDto)
      return res.status(200).json({ statusCode: 200, data: { blog } })
    } catch (error) {
      next(error)
    }
  }
  @Delete("delete/:id")
  async RemoveBlogByID(req: Request, res: Response, next: NextFunction) {
    try {
      const blogDto: BlogIdDto = plainToClass(BlogIdDto, req.params)
      const message: string = await this.blogService.removeByID(blogDto)
      return res.status(200).json({ statusCode: 200, message })
    } catch (error) {
      next(error)
    }
  }
}