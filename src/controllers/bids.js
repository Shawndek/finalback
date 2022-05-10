import pool from '../db/pg.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createBid = asyncHandler(async (req, res) => {
  try {
    const {
      body: { item_id, bidder_id, bid_text },
    } = req;
    console.log([item_id, bidder_id, bid_text]);
    const query =
      'INSERT INTO Bids (item_id, bidder_id, bid_text, bid_status) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [item_id, bidder_id, bid_text, 0];
    const {
      rows: [newBid],
    } = await pool.query(query, values);
    res.status(201).json(newBid);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getItemBids = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const { rows: bids } = await pool.query(
      'SELECT * FROM Bids WHERE item_id = $1' /* 'SELECT u.username, u.email, u.userid, b.bid_id, b.item_id, b.bidder_id, b.bid_text, b.bid_status FROM Bids AS b JOIN Users AS u ON b.bidder_id = u.userid WHERE b.item_id = $1',*/,
      [id]
    );
    res.json(bids);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBid = async (req, res) => {
  try {
    const {
      params: { id },
      body: { bid_id, bid_status },
    } = req;
    const { rowCount: found } = await pool.query(
      'SELECT * FROM Bids WHERE bid_id = $1',
      [bid_id]
    );
    if (!found) {
      throw new Error(`The Item you are trying to update doesn't exist`);
    }

    if (bid_status === 1) {
      const acceptBidPromise = pool.query(
        'UPDATE Bids SET bid_status = $1 WHERE bid_id = $2 RETURNING *',
        [bid_status, bid_id]
      );
      const rejectAllOherBids = pool.query(
        'UPDATE Bids SET bid_status = $1 WHERE item_id = $2 AND bid_id != $3 RETURNING *',
        [2, id, bid_id]
      );
      const [resolvedAccepted, resolvedRejected] = await Promise.all([
        acceptBidPromise,
        rejectAllOherBids,
      ]);

      const { rowCount: acceptedAck, rows: acceptedBid } = resolvedAccepted;
      const { rowCount: rejectedAck, rows: rejectedBids } = resolvedRejected;

      if (!acceptedAck) {
        res.status(400).json({ error: 'Something failed' });
      }

      res.json([...acceptedBid, ...rejectedBids]);
    } else if (bid_status === 2) {
      const rejectBidPromise = await pool.query(
        'UPDATE Bids SET bid_status = $1 WHERE  bid_id = $2 RETURNING *',
        [2, bid_id]
      );
      const { rowCount: rejectAck, rows: rejectBid } = rejectBidPromise;
      if (!rejectAck) {
        res.status(400).json({ error: 'Something failed' });
      }
      res.json(rejectBid);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
