import pool from '../db/pg.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const getAllItems = async (req, res) => {
  try {
    const { rows: items } = await pool.query('SELECT * FROM Items;');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyItems = async (req, res) => {
  try {
    const {
      params: { userid },
    } = req;
    const { rows: items } = await pool.query(
      'SELECT * FROM Items WHERE userid = $1',
      [userid]
    );
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createItem = asyncHandler(async (req, res) => {
  try {
    const {
      body: { itemid, category, title, text, compensation, comment, pic1 },
      user: { userid },
    } = req;
    const query =
      'INSERT INTO Items (itemid, userid, category, title, text, compensation, comment, pic1) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const values = [
      itemid,
      userid,
      category,
      title,
      text,
      compensation,
      comment,
      pic1,
    ];
    const {
      rows: [newItem],
    } = await pool.query(query, values);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getSingleItem = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const {
      rowCount,
      rows: [Item],
    } = await pool.query(
      'SELECT u.username, i.itemid, i.title, i.pic1, i.text, i.category, i.compensation, i.comment, u.email, u.userid FROM Items AS i JOIN Users AS u ON i.userid = u.userid WHERE i.itemid = $1',
      [id]
    );
    if (!rowCount)
      return res.status(404).json({ error: `Item with id of ${id} not found` });

    res.json(Item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const {
      params: { itemid },
      body: { userid, category, title, text, compensation, comment, pic1 },
    } = req;
    const { rowCount: found } = await pool.query(
      'SELECT * FROM Items WHERE id = $1',
      [itemid]
    );
    if (!found) {
      throw new Error(`The Item you are trying to update doesn't exist`);
    }
    /*  if (!title || !author || !category || !imageurl) {
        throw new Error('Invalid body');
      } */
    const {
      rows: [Item],
    } = await pool.query(
      'UPDATE Items SET title = $2, author = $3, category = $4, imageurl = $5 WHERE id = $1 RETURNING *',
      [itemid, userid, category, title, text, compensation, comment, pic1]
    );
    res.json(Item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const {
      params: { itemid },
    } = req;
    const { rowCount } = await pool.query(
      'DELETE FROM Items WHERE id = $1 RETURNING *',
      [itemid]
    );
    if (rowCount) {
      return res.json({ msg: `Item with id of ${itemid} was deleted` });
    } else {
      throw new Error(`Item with id of ${itemid} doesn't even exist`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
