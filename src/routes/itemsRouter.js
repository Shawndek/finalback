import { Router } from 'express';
import { getAllItems, createItem, getSingleItem, updateItem, deleteItem } from '../controllers/items.js';
import verifyToken from "../middlewares/verifyToken.js";

const itemsRouter = Router();

itemsRouter.route('/').get(getAllItems).post(verifyToken, createItem);
itemsRouter.route('/:id').get(getSingleItem).put(verifyToken, updateItem).delete(verifyToken, deleteItem)


export default itemsRouter;