import express from 'express';
const app=express();
import { sequelize } from "./utils/db.js";
import {userRouter} from "./routes/users.js";
import {cardRouter} from "./routes/card.js";
import { SetcardRouter } from './routes/setcards.js';
import cors from 'cors';

app.use(express.json())
app.use(cors())
app.use("/auth",userRouter);
app.use("/card",cardRouter)
app.use("/setcard",SetcardRouter)
sequelize.sync()
.then(result => {
  app.listen(3001);
})
.catch(err => {
  console.log(err);
});

