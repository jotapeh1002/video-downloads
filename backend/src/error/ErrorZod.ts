import { ZodIssue } from "zod";

export class ErrorZod extends Error {
  public statusCode: number;
  public errors: { field: string}[];

  constructor(errors: ZodIssue[], statusCode = 400) {
    super("Erro de validação");

    this.statusCode = statusCode;
    this.errors = errors.map((error) => ({
      field: error.path.join("."),
      message: error.message,
    }));

    Object.setPrototypeOf(this, ErrorZod.prototype);
  }
}
