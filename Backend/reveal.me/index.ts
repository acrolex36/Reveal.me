import express , { Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//middleware
app.use("/api", postRoutes);

//test connect to hosting
app.get("/", (req: Request, res: Response) => {
  res.send('connected to hosting');
});

//set database properties from env file
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

//connect to database
mongoose.connect(`${CONNECTION_URL}`, (err: any) => {
  if (err) {
    console.log("failed to connect");
  } else {
    console.log("Successfully connected to MongoDB");
  }
});

app.listen(
  PORT
, () => {
  console.log(`Server running on http://localhost:${PORT}`
  );
});

module.exports = app
