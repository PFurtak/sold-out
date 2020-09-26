import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Must provide a vaild email'),
    body('password').trim().notEmpty().withMessage('Must provide a password'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
  }
);

export { router as signInRouter };
