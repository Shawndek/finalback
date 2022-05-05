import pool from '../db/pg.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  try {
    const {
      rowCount: found,
      rows: [user],
    } = await pool.query('SELECT * FROM users WHERE email = $1', [
      req.body.email,
    ]);
    if (!found) return res.status(404).json({ error: `User doesn't exist` });

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid)
      return res.status(401).json({ error: `Password is incorrect` });

    const token = jwt.sign(
      {
        userid: user.userid,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET
    );
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
