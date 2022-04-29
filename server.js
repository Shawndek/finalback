import express  from "express";
import imagesRouter from "./src/routes/imagesRouter.js";
import itemsRouter from "./src/routes/itemsRouter.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({origin: "*"}));
app.use(express.json());
app.use('/items', itemsRouter);
app.use('/upload-pic', imagesRouter);
app.get('/', (req,res) => {
    res.send('Items API')
});

app.listen(port, () => console.log(`server runnig at localhost ${port}`));