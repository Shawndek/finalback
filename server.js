import express  from "express";
import imagesRouter from "./src/routes/imagesRouter.js";
import itemsRouter from "./src/routes/itemsRouter.js";
import registerRouter from "./src/routes/registerRouter.js";
import loginRouter from "./src/routes/loginRouter.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({origin: "*"}));
app.use(express.json());



app.use('/items', itemsRouter);
app.use('/upload-pic', imagesRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter)
app.get('/', (req,res) => {
    res.send('Items API')
});
app.post('/register', (req, res) => {
    console.log(req.body)
    res.json({ status: 'ok'})
})

app.listen(port, () => console.log(`server runnig at localhost ${port}`));