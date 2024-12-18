import express, { Application } from "express";
import cors from "cors";
const app: Application = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Server is running 🏃‍♀️‍➡️");
});

export default app;
