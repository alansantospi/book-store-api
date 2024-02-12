import { body, validationResult } from 'express-validator';

export const createOrderValidator = [
  body('userId').notEmpty().withMessage('User id is required'),
  body('bookIds').notEmpty().withMessage('Book ids are required'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
