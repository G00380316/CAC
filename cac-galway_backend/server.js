import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';
import { connectMongoDB } from "./lib/mongo.js";

//Routes
import Webscrape from './routes/webscrape.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

connectMongoDB();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Welcome to Cac Galway Backend Servers'));

app.use('/webscrape', Webscrape);

app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
