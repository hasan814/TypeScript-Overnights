
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../types/public.types";
import { validateSync, ValidationError } from "class-validator";

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


export const errorHandler = (dto: any) => {
  const errors: ValidationError[] = validateSync(dto)
  let errorTexts: any[] = []
  for (const errorItem of errors) {
    errorTexts = errorTexts.concat(errorItem.constraints)
  }
  if (errorTexts.length > 0) throw { status: 400, errors: errorTexts, message: "Validation Error!" }
  return errorTexts
}