import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts";

const CONNECTION_URL =
  "mongodb+srv://guest:test123@mydatabase.w9v8kfk.mongodb.net/RevealMe?retryWrites=true&w=majority";
const PORT = 5000;

const app = express();
app.set("port", `${PORT}`);

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//middleware
app.use("/api", postRoutes);

//connect to database
mongoose.connect(`${CONNECTION_URL}`, (err: any) => {
  if (err) {
    console.log("failed to connect");
  } else {
    console.log("Successfully connected to MongoDB");
  }
});

app.listen(app.get("port"), () => {
  console.log("server läuft auf http://localhost:", app.get("port"));
});
