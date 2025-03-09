
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../types/public.types";

export const ApiErrorHandler = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
  const errorCode: number = error?.status || 500
  const message: string = error?.message || "InternalServerError"
  res.status(errorCode).json({ status: errorCode, message })
}

export const NotFoundErrorHandler = (req: Request, res: Response, next: NextFunction) => {
  const errorCode: number = 500
  const message: string = "InternalServerError"
  res.status(errorCode).json({ status: errorCode, message })
}


export const errorHandler = (errors: any[]) => {
  let errorTexts: string[] = []
  for (const errorItem of errors) {
    errorTexts = errorTexts.concat(errorItem.constraints)
  }
  return errorTexts
}