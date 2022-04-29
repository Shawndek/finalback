import express  from "express";
import itmesRouter from "./src/routes/itemsRouter.js";
//import imagesRouter from "./src/routes/itemsRouter.js";
import cors from "cors";
import imageUploader from "./src/middlewares/imageUploader.js";
import { uploadFile } from "./s3.js"  

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({origin: "*"}));
app.use(express.json());
app.use('/items', itmesRouter);
//app.use('/upload-pic', imagesRouter);
app.get('/', (req,res) => {
    res.send('Items API')
});
 app.post('/upload-pic', imageUploader.single('pic1'), async(req, res, next) => {
  if (!req.file) throw new Error('Please upload an image');
  //console.log(req.file)
  const result = await uploadFile(req.file)
  //console.log(result)
  console.log(req.file.filename)
  res.json({result})
});  

app.listen(port, () => console.log(`server runnig at localhost ${port}`));