import express from "express";
import "dotenv/config";
import { router as alertsRouter } from "./routes/alerts.routes.js";

const app = express();
app.use(express.json());
app.use("/api/alerts", alertsRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`),
);
