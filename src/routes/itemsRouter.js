import { Router } from 'express';
import { getAllItems, createItem, getSingleItem, updateItem, deleteItem } from '../controllers/items.js';

const itemsRouter = Router();

itemsRouter.route('/').get(getAllItems).post(createItem);
itemsRouter.route('/:id').get(getSingleItem).put(updateItem).delete(deleteItem)


export default itemsRouter;