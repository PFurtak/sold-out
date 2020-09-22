import express, { Request, Response } from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Invalid email.'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters.'),
  ],
  (req: Request, res: Response) => {
    const { email, password } = req.body;
  }
);

export { router as signUpRouter };
