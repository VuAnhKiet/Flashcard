import express from 'express';
const app = express();

import { sequelize } from './config/database.js';
import { userRouter } from "./routes/users.js";
import { cardRouter } from "./routes/card.js";
import { groupCardRouter } from './routes/groupcards.js';
import { shareCardsRouter } from './routes/sharesection.js';
import cors from 'cors';

const PORT = process.env.PORT || 3001;
const corsOptions = {
  origin: process.env.FRONTEND_URL,  // Allow only your front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow only specific methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
};

app.get('/', (req, res) => {
  res.send('Welcome to the backend API!');
});

app.use(cors(corsOptions));
app.use(express.json());
app.use("/auth", userRouter);
app.use("/card", cardRouter);
app.use("/setcard", groupCardRouter);
app.use("/share", shareCardsRouter)

sequelize.sync()
  .then(result => {
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });

