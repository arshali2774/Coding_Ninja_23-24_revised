import express from "express";
import dotevn from "dotenv";
dotevn.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Hurray! I have successfully deployed this application on AWS.");
});

export default app;
