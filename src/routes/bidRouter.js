import { Router } from 'express';
import { createBid, getItemBids, updateBid } from '../controllers/bids.js';
import verifyToken from '../middlewares/verifyToken.js';

const bidsRouter = Router();

bidsRouter.route('/').post(verifyToken, createBid);
bidsRouter
  .route('/:id')
  .get(verifyToken, getItemBids)
  .post(verifyToken, updateBid);

export default bidsRouter;
