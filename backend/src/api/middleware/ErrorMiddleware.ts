import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ErrorApi } from "../../error/ErrorApi";
import { ErrorZod } from "../../error/ErrorZod";

export const ErrorMiddleware: ErrorRequestHandler = (
  err: Error & Partial<ErrorApi>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorApi) {
    res.status(err.statusCode).json({ statusCode: err.statusCode, errors: err.errors });
      return
  }
  if (err instanceof ErrorZod) {
    res.status(err.statusCode).json({ statusCode: err.statusCode, errors: err.errors });
      return
  }
    res.status(500).json({ message: "Erro interno do servidor", statusCode: 500 });
      return
};
