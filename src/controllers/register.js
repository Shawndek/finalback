import pool from '../db/pg.js';

export const createUser = async (req, res) => {
    try {
      const {
        body: { username, email, password }
      } = req;
      if (!username || !email || !password ) {
        throw new Error('Invalid body');
      }
/*       const validate = 
        'SELECT * FROM Users WHERE email=${email}' */
      const query =
        'INSERT INTO Users (username, email, password) VALUES($1, $2, $3) RETURNING *';
      const values = [username, email, password];
      const {
        rows: [newUser]
      } = await pool.query(query, values);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };