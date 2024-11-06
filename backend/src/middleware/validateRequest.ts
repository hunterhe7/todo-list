import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { HttpError } from '../package/http_error';

export const validateRequest =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      throw new HttpError(400, 'Validation Error');
    }
  };
