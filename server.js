import express from "express";
import { Connection } from "./database/db.js";
import dotenv from "dotenv";
import DefaultData from "./default.js";
import Router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use("/", Router);

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const URL =
  process.env.MONGODB_URI ||
  `mongodb+srv://${USERNAME}:${PASSWORD}@ecommerce.hpulrzn.mongodb.net/?retryWrites=true&w=majority`;

Connection(URL);

if(process.env.NODE_ENV==="production"){
  app.use(express.static('client/build'))
}

app.listen(PORT, () => {
  console.log(`Server running on PORT http:localhost//:${PORT}`);
});

DefaultData();
