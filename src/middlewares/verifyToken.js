import jwt from 'jsonwebtoken';
import asyncHandler from '../../utils/asyncHandler.js';
import ErrorResponse from '../../utils/ErrorResponse.js';
import pool from '../db/pg.js';

const verifyToken = asyncHandler(async (req, res, next) => {
  const {
    headers: { authorization }
  } = req;
  if (!authorization) throw new ErrorResponse('Please login', 403);
  const { username } = jwt.verify(authorization, process.env.JWT_SECRET);
  const {
    rows: [user]}= await pool.query('SELECT userid, username, email FROM users WHERE username = $1', [
      username
  ]);
  if (!user) throw new ErrorResponse('User does not exist', 403);
  req.user = user;
  next();
});

export default verifyToken;