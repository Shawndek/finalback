import pool from '../db/pg.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const createUser = async (req, res) => {
    try {
      const {
        body: { username, email, password }
      } = req;
      if (!username || !email || !password ) {
        throw new Error('Invalid body');
      }
      const {
        rowCount: foundEmail,
      } = await pool.query('SELECT * FROM users WHERE email = $1', [
        req.body.email,
      ]);
      if (foundEmail) return res.status(404).json({ error: `email already in use` });
      const hash = await bcrypt.hash(password, 5)

      const {
        rowCount: foundUser,
      } = await pool.query('SELECT * FROM users WHERE username = $1', [
        req.body.username,
      ]);
      if (foundUser) return res.status(404).json({ error: `Username already exists` });
 

      const query =
        'INSERT INTO Users (username, email, password) VALUES($1, $2, $3) RETURNING *';
      const values = [username, email, hash];
      const {
        rows: [newUser]
      } = await pool.query(query, values);    

      const token = jwt.sign(
      {
        userid: newUser.userid,
        username: newUser.username,
        email: newUser.email,
      },
      process.env.JWT_SECRET
    );
      return res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }



  };