import { Router } from 'express';
import { postImages } from "../controllers/images.js"
import imageUploader from '../middlewares/imageUploader.js';

const imagesRouter = Router();

imagesRouter.route('/').post(imageUploader.single('pic1'), postImages);

export default imagesRouter;