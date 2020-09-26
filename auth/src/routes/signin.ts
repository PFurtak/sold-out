import express, { Request, Response } from 'express';
import { validateRequest } from '../middlewares/validate-request';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Must provide a vaild email'),
    body('password').trim().notEmpty().withMessage('Must provide a password'),
  ],
  validateRequest,
  (req: Request, res: Response) => {}
);

export { router as signInRouter };
